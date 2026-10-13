// Cloudflare Worker: serves the Pawsome API (a port of the Flask routes in
// backend/) and hands every other request to the static files in frontend/.
import orgs from "../backend/data/sample_orgs.json";

const DEFAULT_LOGO = "/assets/logo.jpg";
const SUMMARY_CUTOFF = 150;
const SYSTEM_PROMPT =
    "Summarize the following volunteer organization in 1-2 friendly sentences " +
    "that would appeal to a potential volunteer. Focus on mission and impact. " +
    "Keep it under 100 words.";

// Summaries are cached per Worker instance so repeat searches don't re-call OpenAI.
const summaryCache = new Map();

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/api/opportunities" && request.method === "GET") {
            return handleOpportunities(url, env);
        }
        if (url.pathname === "/api/summarize" && request.method === "POST") {
            return handleSummarize(request, env);
        }
        if (url.pathname.startsWith("/api/")) {
            return json({ error: "Not found" }, 404);
        }
        return env.ASSETS.fetch(request);
    },
};

async function handleOpportunities(url, env) {
    const zip = (url.searchParams.get("zip") || "").trim();
    const category = (url.searchParams.get("category") || "").trim() || null;

    if (!zip) {
        return json({ error: "zip parameter is required" }, 400);
    }

    const matches = orgs.filter(
        (org) =>
            zipMatches(zip, org.zipCodes || []) &&
            (category === null || org.category === category)
    );

    const results = await Promise.all(
        matches.map(async (org) => ({
            id: org.id,
            name: org.name,
            description: org.description,
            summary: org.summary || (await generateSummary(org.description, env)),
            logoUrl: getLogoUrl(org.logoUrl, org.aboutUrl),
            aboutUrl: org.aboutUrl || "",
            volunteerUrl: org.volunteerUrl || "",
            zipCodes: org.zipCodes || [],
            category: org.category || "Community",
        }))
    );

    return json(results);
}

async function handleSummarize(request, env) {
    let data = {};
    try {
        data = await request.json();
    } catch {}
    const description = (data.description || "").trim();

    if (!description) {
        return json({ error: "description is required" }, 400);
    }
    return json({ summary: await generateSummary(description, env) });
}

// Exact match first; fall back to 2-digit prefix (same metro region).
function zipMatches(zip, orgZipCodes) {
    if (orgZipCodes.includes(zip)) return true;
    const prefix = zip.slice(0, 2);
    return orgZipCodes.some((z) => z.slice(0, 2) === prefix);
}

async function generateSummary(description, env) {
    if (summaryCache.has(description)) return summaryCache.get(description);
    if (!env.OPENAI_API_KEY) return truncate(description);

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: env.OPENAI_MODEL || "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: description },
                ],
                max_tokens: 80,
                temperature: 0.7,
            }),
        });
        if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
        const data = await res.json();
        const summary = data.choices[0].message.content.trim();
        summaryCache.set(description, summary);
        return summary;
    } catch {
        return truncate(description);
    }
}

function truncate(text) {
    return text.length > SUMMARY_CUTOFF
        ? text.slice(0, SUMMARY_CUTOFF).trimEnd() + "..."
        : text;
}

function getLogoUrl(clearbitUrl, aboutUrl) {
    const domain = extractDomain(clearbitUrl) || extractDomain(aboutUrl);
    return domain
        ? `https://www.google.com/s2/favicons?domain=${domain}&sz=256`
        : DEFAULT_LOGO;
}

function extractDomain(url) {
    if (!url) return "";
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase();
        // Clearbit URLs store the real domain as the path (e.g. logo.clearbit.com/aspca.org)
        if (host === "logo.clearbit.com") return parsed.pathname.replace(/^\//, "");
        return host.replace("www.", "");
    } catch {
        return "";
    }
}

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

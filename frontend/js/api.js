const API_BASE = "";

async function fetchOpportunities(zip, category = "") {
    const params = new URLSearchParams({ zip });
    if (category) params.append("category", category);

    const res = await fetch(`${API_BASE}/api/opportunities?${params}`);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
}

async function fetchSummary(description) {
    const res = await fetch(`${API_BASE}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
    });
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const data = await res.json();
    return data.summary;
}

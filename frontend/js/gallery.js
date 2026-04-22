const FALLBACK_LOGO = "/logo.jpg";

function createBlock(org) {
    const block = document.createElement("div");
    block.className = "vc-square";

    if (org.category) {
        const badge = document.createElement("span");
        badge.className = "vc-category-badge";
        badge.textContent = org.category;
        block.appendChild(badge);
    }

    const img = document.createElement("img");
    img.className = "vc-logo";
    img.alt = org.name;
    img.src = org.logoUrl || FALLBACK_LOGO;
    img.addEventListener("error", () => { img.src = FALLBACK_LOGO; });
    block.appendChild(img);

    const overlay = createOverlay(org);
    block.appendChild(overlay);
    attachHoverBehavior(block, overlay);

    return block;
}

function renderGallery(opportunities) {
    const gallery = document.getElementById("vc-gallery");
    const status = document.getElementById("gallery-status");

    gallery.innerHTML = "";

    if (!opportunities || opportunities.length === 0) {
        const empty = document.createElement("div");
        empty.className = "vc-empty";
        empty.textContent =
            "No volunteer opportunities found for this area. Try a different ZIP code or category.";
        gallery.appendChild(empty);
        status?.classList.add("hidden");
        return;
    }

    status?.classList.add("hidden");
    opportunities.forEach((org) => gallery.appendChild(createBlock(org)));
}

function showSkeletons(count = 8) {
    const gallery = document.getElementById("vc-gallery");
    const status = document.getElementById("gallery-status");
    gallery.innerHTML = "";
    status?.classList.add("hidden");
    for (let i = 0; i < count; i++) {
        const skel = document.createElement("div");
        skel.className = "vc-skeleton";
        gallery.appendChild(skel);
    }
}

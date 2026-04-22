function createOverlay(org) {
    const overlay = document.createElement("div");
    overlay.className = "vc-overlay";

    const name = document.createElement("div");
    name.className = "vc-org-name";
    name.textContent = org.name;

    const summary = document.createElement("p");
    summary.className = "vc-summary";
    summary.textContent = org.summary || (org.description || "").slice(0, 150) + "...";

    const btnGroup = document.createElement("div");
    btnGroup.className = "vc-btn-group";

    if (org.volunteerUrl) {
        const volunteerBtn = document.createElement("a");
        volunteerBtn.href = org.volunteerUrl;
        volunteerBtn.target = "_blank";
        volunteerBtn.rel = "noopener noreferrer";
        volunteerBtn.className = "vc-btn vc-btn-volunteer";
        volunteerBtn.textContent = "Start Volunteering";
        btnGroup.appendChild(volunteerBtn);
    }

    if (org.aboutUrl) {
        const learnBtn = document.createElement("a");
        learnBtn.href = org.aboutUrl;
        learnBtn.target = "_blank";
        learnBtn.rel = "noopener noreferrer";
        learnBtn.className = "vc-btn vc-btn-learn";
        learnBtn.textContent = "Learn More";
        btnGroup.appendChild(learnBtn);
    }

    overlay.appendChild(name);
    overlay.appendChild(summary);
    overlay.appendChild(btnGroup);

    return overlay;
}

function attachHoverBehavior(block, overlay) {
    block.addEventListener("mouseenter", () => overlay.classList.add("visible"));
    block.addEventListener("mouseleave", () => overlay.classList.remove("visible"));
}

const DEBOUNCE_MS = 400;

let debounceTimer = null;
let activeCategory = "";

function debounce(fn, delay) {
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fn(...args), delay);
    };
}

async function onFilterChange() {
    const zip = document.getElementById("zip-input").value.trim();
    if (zip.length !== 5 || !/^\d{5}$/.test(zip)) return;

    showSkeletons();

    try {
        const opportunities = await fetchOpportunities(zip, activeCategory);
        renderGallery(opportunities);
    } catch {
        const gallery = document.getElementById("vc-gallery");
        gallery.innerHTML =
            '<div class="vc-empty">Could not load opportunities. Make sure the server is running and try again.</div>';
    }
}

const debouncedFilter = debounce(onFilterChange, DEBOUNCE_MS);

document.addEventListener("DOMContentLoaded", () => {
    const zipInput = document.getElementById("zip-input");
    zipInput.addEventListener("input", debouncedFilter);

    document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category;
            onFilterChange();
        });
    });

    // Pre-fill ZIP from home page form submission
    const urlParams = new URLSearchParams(window.location.search);
    const zipFromUrl = urlParams.get("zip");
    if (zipFromUrl) {
        zipInput.value = zipFromUrl;
        onFilterChange();
    }
});

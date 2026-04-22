import os

# --- Gallery UI spacing (px) — mirrored as CSS variables in gallery.css ---
VC_SPACING_VERTICAL = 20
VC_SPACING_HORIZONTAL = 20

# Default block size (px)
VC_SQUARE_WIDTH = 220
VC_SQUARE_HEIGHT = 220

# --- External API base URLs ---
CLEARBIT_LOGO_BASE_URL = "https://logo.clearbit.com"
VOLUNTEERMATCH_API_BASE_URL = "https://www.volunteermatch.org/api"

# --- GPT settings ---
GPT_MODEL = "gpt-3.5-turbo"
GPT_MAX_TOKENS = 80
GPT_SUMMARY_SYSTEM_PROMPT = (
    "Summarize the following volunteer organization in 1-2 friendly sentences "
    "that would appeal to a potential volunteer. Focus on mission and impact. "
    "Keep it under 100 words."
)

# --- Fallback logo path served by Flask ---
DEFAULT_LOGO_PATH = "/fallbacklogo.jpg"

# --- Supported filter categories ---
CATEGORIES = ["Animals", "Community", "Education", "Environment", "Health", "Seniors"]

# --- Frontend debounce delay (ms) for ZIP code input ---
DEBOUNCE_DELAY_MS = 400

# --- Path to curated sample organization data ---
SAMPLE_DATA_PATH = os.path.join(
    os.path.dirname(__file__), "..", "backend", "data", "sample_orgs.json"
)

from urllib.parse import urlparse

DEFAULT_LOGO = "/logo.jpg"


def get_logo_url(clearbit_url: str = "", about_url: str = "") -> str:
    """Return a working logo URL for an org.

    Extracts the org's real domain from its Clearbit URL or aboutUrl and builds
    a Google Favicon request. Google's favicon service is free, requires no auth,
    and returns PNG icons up to 256px — reliable enough for the gallery cards.
    """
    domain = _extract_domain(clearbit_url) or _extract_domain(about_url)
    if domain:
        return f"https://www.google.com/s2/favicons?domain={domain}&sz=256"
    return DEFAULT_LOGO


def _extract_domain(url: str) -> str:
    if not url:
        return ""
    try:
        parsed = urlparse(url)
        host = parsed.netloc.lower()
        # Clearbit URLs store the real domain as the path (e.g. logo.clearbit.com/aspca.org)
        if host == "logo.clearbit.com":
            return parsed.path.lstrip("/")
        return host.replace("www.", "")
    except Exception:
        return ""

import json
import os
from typing import List, Optional

from models.opportunity import Opportunity

SAMPLE_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sample_orgs.json")

_sample_data: Optional[List[dict]] = None


def _load_sample_data() -> List[dict]:
    global _sample_data
    if _sample_data is None:
        with open(SAMPLE_DATA_PATH, "r", encoding="utf-8") as f:
            _sample_data = json.load(f)
    return _sample_data


def _zip_matches(zip_code: str, org_zip_codes: list) -> bool:
    """Exact match first; fall back to 3-digit prefix (same metro area)."""
    if zip_code in org_zip_codes:
        return True
    prefix = zip_code[:3]
    return any(z[:3] == prefix for z in org_zip_codes)


def get_opportunities(zip_code: str, category: Optional[str] = None) -> List[Opportunity]:
    """Return volunteer opportunities matching the given ZIP code and optional category."""
    orgs = _load_sample_data()
    results = []
    for org in orgs:
        if _zip_matches(zip_code, org.get("zipCodes", [])):
            if category is None or org.get("category") == category:
                results.append(Opportunity.from_dict(org))
    return results

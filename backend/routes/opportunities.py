from flask import Blueprint, jsonify, request

from services.volunteer_api import get_opportunities
from services.gpt_service import generate_summary
from services.logo_service import get_logo_url

opportunities_bp = Blueprint("opportunities", __name__)


@opportunities_bp.route("/api/opportunities")
def opportunities():
    zip_code = request.args.get("zip", "").strip()
    category = request.args.get("category", "").strip() or None

    if not zip_code:
        return jsonify({"error": "zip parameter is required"}), 400

    orgs = get_opportunities(zip_code, category)

    results = []
    for org in orgs:
        if not org.summary:
            org.summary = generate_summary(org.description)
        org.logoUrl = get_logo_url(org.logoUrl, org.aboutUrl)
        results.append(org.to_dict())

    return jsonify(results)

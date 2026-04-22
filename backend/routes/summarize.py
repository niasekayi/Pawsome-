from flask import Blueprint, jsonify, request

from services.gpt_service import generate_summary

summarize_bp = Blueprint("summarize", __name__)


@summarize_bp.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.get_json(silent=True) or {}
    description = data.get("description", "").strip()

    if not description:
        return jsonify({"error": "description is required"}), 400

    summary = generate_summary(description)
    return jsonify({"summary": summary})

import sys
import os

# Add project root to path so Config module is importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from routes.opportunities import opportunities_bp
from routes.summarize import summarize_bp

FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

app = Flask(__name__, static_folder=None)
CORS(app)

app.register_blueprint(opportunities_bp)
app.register_blueprint(summarize_bp)


@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/volunteering")
def volunteering():
    return send_from_directory(FRONTEND_DIR, "volunteering.html")


@app.route("/css/<path:filename>")
def css(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, "css"), filename)


@app.route("/js/<path:filename>")
def js_files(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, "js"), filename)


@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, "assets"), filename)


@app.route("/logo.jpg")
def fallback_logo():
    return send_from_directory(ROOT_DIR, "logo.jpg")


@app.route("/pawsome-logo.png")
def pawsome_logo():
    return send_from_directory(ROOT_DIR, "pawsome logo.png")


@app.route("/front-page-pic.png")
def front_page_pic():
    return send_from_directory(ROOT_DIR, "front page pic.png")


if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(debug=debug, port=port)

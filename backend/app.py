from flask import Flask
from flask_cors import CORS
from config import config
from extensions import db, jwt
import os


def create_app(config_name="default"):
    """Application Factory"""

    print("🚀 Creating Flask application...")

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Enable CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
    )

    # Create uploads directory if it doesn't exist
    upload_folder = app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)

    # Register API routes
    from routes import api_bp

    app.register_blueprint(api_bp, url_prefix="/api")

    # Import models
    from models import User, File

    # Create database tables
    with app.app_context():
        db.create_all()

    print("✅ Application initialized successfully!")

    return app


# Detect environment automatically
config_name = "production" if os.getenv("RENDER") else "development"

# Create Flask application
app = create_app(config_name)

print(f"Running in {config_name.upper()} mode")


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=config_name == "development",
        use_reloader=False,
    )
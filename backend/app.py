from flask import Flask
from flask_cors import CORS
from config import config
from extensions import db, jwt
import os


def create_app(config_name='default'):
    """Application factory pattern"""

    print("STEP 1: Creating Flask app")

    app = Flask(__name__)

    print("STEP 2: Loading configuration")

    # Load configuration
    app.config.from_object(config[config_name])

    print("STEP 3: Initializing extensions")

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    print("STEP 4: Checking upload folder")

    # Create upload folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    print("STEP 5: Importing routes")

    # Register blueprints
    from routes import api_bp

    print("STEP 6: Registering routes")

    app.register_blueprint(api_bp, url_prefix='/api')

    print("STEP 7: Importing models")

    # Import models to ensure they are registered with SQLAlchemy
    from models import User, File

    print("STEP 8: Creating database tables")

    # Create database tables
    with app.app_context():
        db.create_all()

    print("STEP 9: Database ready")

    return app


print("Starting application...")

# Create the app instance
app = create_app()

print("Application created successfully")

if __name__ == '__main__':
    print("Starting Flask server on port 5000...")
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        use_reloader=False
    )
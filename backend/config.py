import os
from dotenv import load_dotenv

# Load environment variables from .env (for local development)
load_dotenv()


class Config:
    """Base Configuration"""

    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-this")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key-change-this")

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///minidrive.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Settings
    JWT_ACCESS_TOKEN_EXPIRES = 3600          # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 60 * 60 * 24 * 30   # 30 days

    # Upload Configuration
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    MAX_CONTENT_LENGTH = 10 * 1024 * 1024    # 10 MB


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": ProductionConfig if os.getenv("RENDER") else DevelopmentConfig
}
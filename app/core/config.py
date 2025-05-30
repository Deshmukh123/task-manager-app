import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

settings = Settings()

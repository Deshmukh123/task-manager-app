from app.database import Base, engine
from app.models import user  # Make sure this import includes the User model

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

print("✅ Tables dropped and re-created successfully.")

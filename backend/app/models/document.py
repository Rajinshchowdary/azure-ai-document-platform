from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from datetime import datetime
import uuid
from app.db.session import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True) # Microsoft Entra ID OID
    filename = Column(String, nullable=False)
    azure_blob_url = Column(String, nullable=True)
    status = Column(String, default="uploading")
    summary = Column(String, nullable=True)
    extracted_text = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

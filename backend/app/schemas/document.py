from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentBase(BaseModel):
    name: str
    type: str
    size: int

class DocumentCreate(DocumentBase):
    status: str = "pending"

class DocumentResponse(DocumentBase):
    id: str
    user_id: str
    status: str
    url: Optional[str] = None
    summary: Optional[str] = None
    classification: Optional[str] = None
    uploaded_at: datetime

    class Config:
        from_attributes = True

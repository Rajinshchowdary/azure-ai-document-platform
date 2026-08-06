from fastapi import APIRouter, Depends, Security, UploadFile, File
from app.core.security import azure_scheme
from fastapi_azure_auth.user import User

router = APIRouter()

@router.get("/")
def get_documents(user: User = Security(azure_scheme)):
    # user.oid is the Object ID from Entra ID
    return {"message": "Get documents placeholder", "user_id": user.oid}

@router.post("/upload")
def upload_document(file: UploadFile = File(...), user: User = Security(azure_scheme)):
    # 1. Upload `file` to Azure Blob Storage
    # 2. Save metadata to Supabase DB with `user_id = user.oid`
    return {"message": f"Uploaded {file.filename}", "user_id": user.oid}

@router.get("/{id}")
def get_document(id: str, user: User = Security(azure_scheme)):
    # Filter by user.oid to enforce security
    return {"message": f"Get document {id} placeholder", "user_id": user.oid}

@router.delete("/{id}")
def delete_document(id: str, user: User = Security(azure_scheme)):
    # Verify document belongs to user.oid before deleting
    return {"message": f"Delete document {id} placeholder", "user_id": user.oid}

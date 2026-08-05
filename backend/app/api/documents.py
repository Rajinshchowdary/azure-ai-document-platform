from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_documents():
    return {"message": "Get documents placeholder"}

@router.post("/upload")
def upload_document():
    return {"message": "Upload document placeholder"}

@router.get("/{id}")
def get_document(id: str):
    return {"message": f"Get document {id} placeholder"}

@router.delete("/{id}")
def delete_document(id: str):
    return {"message": f"Delete document {id} placeholder"}

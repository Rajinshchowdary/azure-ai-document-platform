from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import documents

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for DocuMind AI Document Intelligence Platform",
    version="1.0.0"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])

@app.get("/")
def root():
    return {"message": "Welcome to DocuMind AI API"}

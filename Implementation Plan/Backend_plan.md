# Phase 3: Backend API (FastAPI + Azure + Supabase DB)

We will build a high-performance REST API using **FastAPI** to serve the frontend and manage the document processing pipeline. The architecture utilizes Microsoft Azure for core services and Supabase purely as a hosted PostgreSQL database.

## Architecture & Responsibilities

1. **Hosting**: Azure App Service (Linux Web App containerizing the FastAPI app).
2. **Authentication**: Microsoft Entra ID (Azure AD). FastAPI will validate JWT tokens issued by Microsoft.
3. **Database**: Supabase PostgreSQL (accessed via SQLAlchemy). Stores document metadata and AI processing results.
4. **File Storage**: Azure Blob Storage. Stores the physical PDF files.
5. **AI/ML Processing**: Handled by Azure Functions triggered by Blob Storage uploads (Phase 4).

## 1. Directory Structure
```
backend/
├── app/
│   ├── main.py              # FastAPI application instance
│   ├── core/
│   │   ├── config.py        # Environment variables and settings
│   │   └── security.py      # Entra ID JWT validation
│   ├── api/                 # API routers
│   │   └── documents.py     # /documents, /upload, /document/{id}
│   ├── models/              # SQLAlchemy database models
│   ├── schemas/             # Pydantic validation schemas
│   └── services/            # Business logic (Azure Blob uploads, DB queries)
├── requirements.txt
└── .env
```

## 2. Technology Stack & Dependencies
- **Framework**: `fastapi`, `uvicorn[standard]`
- **Validation**: `pydantic`, `pydantic-settings`
- **Database**: `sqlalchemy` (connecting directly to Supabase's PostgreSQL pooler) + `psycopg2-binary`
- **Authentication**: `fastapi-azure-auth` (or manual `PyJWT` + `cryptography` for Entra ID validation)
- **Azure SDKs**: `azure-storage-blob`, `azure-identity`
- **File Uploads**: `python-multipart`

## 3. Implementation Steps
1. **Initialize Backend**: Clean up `requirements.txt` to remove `supabase` Python client, add `fastapi-azure-auth`.
2. **Database Setup**: Define the `Document` SQLAlchemy model. The `user_id` will be a `String` storing the Microsoft Entra ID object ID.
3. **Authentication Setup**: Implement the Entra ID token validation dependency in `core/security.py`. All protected routes will require a valid Microsoft token.
4. **Document API**: 
   - `POST /upload`: 
     1. Accept `multipart/form-data`.
     2. Stream the file directly to **Azure Blob Storage**.
     3. Save metadata (filename, Azure Blob URL, user_id from Entra token, status="uploading") to **Supabase PostgreSQL**.
   - `GET /documents`: Query the DB for documents matching the current user's Entra ID.
   - `GET /document/{id}`: Fetch specific document metadata.
   - `DELETE /document/{id}`: Remove from Azure Blob Storage and Supabase DB.
5. **Deployment**: Configure a `startup.sh` script or Dockerfile for deploying the FastAPI app to **Azure App Service**.

## Verification Plan
- Start the FastAPI server locally.
- Use an Azure AD test token to authenticate via the Swagger UI (`/docs`).
- Successfully upload a test PDF and verify it appears in both Azure Blob Storage and the Supabase database.

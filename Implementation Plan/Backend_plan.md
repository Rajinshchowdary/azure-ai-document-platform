# Phase 3: Backend API (FastAPI + Supabase)

We will build a high-performance REST API using **FastAPI** to serve the frontend and manage the document processing pipeline. As requested, we will integrate **Supabase** for our database (PostgreSQL) and authentication.

## Open Questions

> [!IMPORTANT]
> The original `Requirements.md` specifies **Microsoft Entra ID** for authentication and **Azure Blob Storage** for file uploads. Since you requested to use Supabase:
> 
> 1. **Authentication**: Shall we completely replace Entra ID with **Supabase Auth**? (I highly recommend this as it integrates flawlessly with the Supabase Postgres DB).
> 2. **File Storage**: Shall we use **Supabase Storage** for the PDF uploads, or stick to **Azure Blob Storage** as per the original architecture?
> 
> *My recommendation: Use Supabase for Database + Auth, but keep Azure Blob Storage for the files so we remain aligned with the Azure architecture goal.*

## Proposed Architecture

### 1. Directory Structure
```
backend/
├── app/
│   ├── main.py              # FastAPI application instance
│   ├── core/
│   │   ├── config.py        # Environment variables and settings
│   │   └── security.py      # JWT validation / Auth dependencies
│   ├── api/                 # API routers
│   │   ├── auth.py          # /login, /register
│   │   └── documents.py     # /documents, /upload, /document/{id}
│   ├── models/              # SQLAlchemy database models
│   ├── schemas/             # Pydantic validation schemas
│   └── services/            # Business logic (DB queries, Storage uploads)
├── requirements.txt
└── .env
```

### 2. Technology Stack & Dependencies
- **Framework**: `fastapi`, `uvicorn[standard]`
- **Validation**: `pydantic`
- **Database**: `sqlalchemy` (connecting directly to Supabase's PostgreSQL pooler) + `psycopg2-binary`
- **Supabase Integration**: `supabase` (Python client for Auth)
- **File Uploads**: `python-multipart`

### 3. Implementation Steps
1. **Initialize Backend**: Create the `backend/` folder, set up a Python virtual environment, and install `requirements.txt`.
2. **Database Setup**: Define the `User` and `Document` SQLAlchemy models to map to Supabase PostgreSQL.
3. **Authentication API**: Implement `POST /register` and `POST /login` using the Supabase Python client to handle user creation and JWT generation.
4. **Document API**: 
   - `POST /upload`: Accept `multipart/form-data`, stream the file to Storage, and save metadata to the DB.
   - `GET /documents`: Query the DB for the user's documents.
   - `GET /document/{id}`: Fetch specific document metadata.
   - `DELETE /document/{id}`: Remove from Storage and DB.
5. **CORS Configuration**: Allow the React frontend (`http://localhost:5173`) to communicate with the FastAPI backend.

## Verification Plan
- Start the FastAPI server on `http://localhost:8000`.
- Verify the Swagger UI (`/docs`) is accessible.
- Use `curl` or the frontend to successfully register a user, login, and upload a test PDF.

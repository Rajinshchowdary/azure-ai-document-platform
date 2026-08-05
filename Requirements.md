## Functional Requirements

### User Management

* User registration and login
* Secure authentication
* User profile management

### Document Management

* Upload PDF documents
* View uploaded documents
* Delete uploaded documents
* Download original documents

### AI/ML Processing

* Automatically process uploaded PDFs
* Extract text from documents
* Generate document summaries
* Classify document types
* Generate vector embeddings
* Store processing results

### Dashboard

* Display uploaded documents
* Show processing status
* Display AI-generated summaries
* View document metadata
* Search uploaded documents (future enhancement)

### Security

* Secure file uploads
* Authentication and authorization
* Secure storage of secrets
* HTTPS communication

---

# Non-Functional Requirements

* Responsive web interface
* Scalable cloud architecture
* Event-driven processing
* Secure storage
* Fault tolerance
* High availability
* Logging and monitoring
* Maintainable codebase

---

# Azure Services

| Service                   | Purpose                     |
| ------------------------- | --------------------------- |
| Azure App Service         | Host frontend and backend   |
| Azure Blob Storage        | Store uploaded PDFs         |
| Azure Functions           | Trigger document processing |
| Azure Virtual Machine     | Run AI/ML inference         |
| Azure Key Vault           | Store secrets               |
| Microsoft Entra ID        | Authentication              |
| Azure Application Gateway | HTTPS and WAF               |
| Azure DNS                 | Custom domain               |
| Azure Monitor             | Monitoring and logging      |

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

## Backend

* FastAPI
* Python

## AI/ML

* PyTorch or TensorFlow
* Transformers
* Sentence Transformers
* OCR library (optional)

## Azure

* App Service
* Blob Storage
* Azure Functions
* Virtual Machines
* Key Vault
* Entra ID
* Application Gateway

---

## When should you create `requirements.txt`?

Only when you start **Phase 3 (FastAPI backend)**. A good initial `requirements.txt` might look like:

```text
fastapi
uvicorn[standard]
python-multipart
pydantic
sqlalchemy
python-dotenv
azure-storage-blob
azure-identity
azure-keyvault-secrets
requests
```

Later, when you build the ML service, add:

```text
transformers
sentence-transformers
torch
pymupdf
pdfplumber
pytesseract
opencv-python
numpy
pandas
```

This keeps your dependencies minimal during early development and avoids installing heavy ML packages before they're actually needed.

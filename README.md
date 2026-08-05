End-to-end "AI Document Intelligence Platform" :

- React frontend
- FastAPI on Azure App Service
- Azure Blob Storage for document uploads
- Azure Functions triggered by new uploads
- Python ML pipeline on an Azure VM (summarization, embeddings, classification)
- Microsoft Entra ID for authentication
- Azure Key Vault for secrets
- Azure Virtual Network connecting the VM and Function securely
- Azure Application Gateway with HTTPS and WAF
- Monitoring using Azure Monitor and Application Insights

Repository structure:

azure-aiml-document-platform/
├── frontend/
│   └── ...
├── backend/
│   └── ...
├── functions/
│   └── ...
├── ml-service/
│   └── ...
├── infra/
│   └── ...
├── docs/
│   └── ...
├── diagrams/
│   └── ...
└── .github/

Architecture Mapping

| Azure Service       | Role                      |
| ------------------- | ------------------------- |
| Azure DNS           | Domain                    |
| Application Gateway | HTTPS + WAF               |
| Load Balancer       | Route traffic             |
| App Service         | Frontend + REST API       |
| Blob Storage        | Store uploaded PDFs       |
| Azure Functions     | Trigger after upload      |
| VM                  | Long-running ML inference |
| Managed Disk        | Store local ML models     |
| Key Vault           | API keys                  |
| Entra ID            | User login                |


Possible ML features:
- Resume parser
- Invoice analyzer
- Legal document summarizer
- Research paper summarizer
- OCR
- Embedding search
- Question answering over PDFs


This demonstrates:
- Event-driven architecture
- AI pipeline
- Storage
- Compute
- Authentication
# Azure AI/ML Document Platform

End-to-end Azure AI/ML document processing platform built with App Service, Azure Functions, Blob Storage, Virtual Machines, Key Vault, and Microsoft Entra ID.

## Architecture Overview

This repository defines a reference architecture for secure document ingestion, processing, and serving:

1. **Microsoft Entra ID** authenticates users, applications, and managed identities.
2. **App Service** hosts the web/API entry point for document uploads and workflow orchestration.
3. **Azure Blob Storage** stores raw uploads, intermediate artifacts, and final processed outputs.
4. **Azure Functions** execute event-driven document preprocessing, AI enrichment, and metadata extraction.
5. **Azure Virtual Machines** run custom AI/ML workloads that require dedicated compute or specialized runtimes.
6. **Azure Key Vault** secures secrets, keys, and connection settings used across all services.

## End-to-End Processing Flow

1. A user signs in through **Microsoft Entra ID** and submits a document via **App Service**.
2. The document is saved to **Blob Storage**.
3. A blob-triggered **Azure Function** validates and prepares the document.
4. Processing tasks are dispatched to **Virtual Machines** for AI/ML inference when needed.
5. Post-processing **Azure Functions** normalize outputs and write results back to **Blob Storage**.
6. **App Service** serves processed results to authorized users and systems.
7. Secrets and credentials are retrieved from **Key Vault** throughout the pipeline.

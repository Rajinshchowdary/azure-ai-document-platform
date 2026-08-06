from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from app.core.config import settings

azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=settings.AZURE_CLIENT_ID,
    tenant_id=settings.AZURE_TENANT_ID,
    scopes={
        f"api://{settings.AZURE_CLIENT_ID}/user_impersonation": "User impersonation"
    }
)

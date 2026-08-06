# Supabase PostgreSQL Setup Guide

This guide will walk you through setting up your Supabase project purely to use its hosted PostgreSQL database. This database will store the document metadata for the Azure AIML Document Platform.

---

## 1. Create a Supabase Project

1. Go to [database.new](https://database.new) or [supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**.
3. Select your organization (or create one).
4. Fill in the project details:
   - **Name:** `azure-aiml-platform` (or similar)
   - **Database Password:** Generate a strong password and **save it somewhere safe**. You will need this for your FastAPI backend.
   - **Region:** Choose a region close to your Azure deployment for the best performance.
5. Click **"Create new project"**. It will take a few minutes for the database to provision.

---

## 2. Retrieve Your Connection Details

Your FastAPI backend needs to securely communicate with the Supabase database. You only need the Database Connection String.

1. Go to **Project Settings** (the gear icon on the left sidebar) -> **Database**.
2. **Connection String:** Scroll down to "Connection string" and select **URI**. It will look something like this:
   `postgresql://postgres.xxxxxx:[YOUR-PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres`
   *(Remember to replace `[YOUR-PASSWORD]` with the password you created in Step 1).*

postgresql://postgres:[YOUR-PASSWORD]@db.kzzezyhajtyhzpwfbfdv.supabase.co:5432/postgres
---

## 3. Set Up the Database Schema

Now we need to create the table that will store the metadata for the PDFs that users upload.

1. Go to the **SQL Editor** (the terminal icon on the left sidebar).
2. Click **"New query"**.
3. Paste the following SQL code and click **"Run"** in the bottom right.

```sql
-- Create an ENUM type for document processing statuses
CREATE TYPE document_status AS ENUM ('uploading', 'processing', 'completed', 'failed');

-- Create the documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- This will store the Microsoft Entra ID Object ID (OID)
  filename TEXT NOT NULL,
  azure_blob_url TEXT,
  status document_status DEFAULT 'uploading'::document_status,
  summary TEXT,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a function to automatically update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach the trigger to the documents table
CREATE TRIGGER update_documents_modtime
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

### What this schema does:
* **`user_id`**: Stores the Microsoft Entra ID identifier for the user. Because we aren't using Supabase Auth, this is a standard `TEXT` column.
* **`azure_blob_url`**: Where the physical file is stored in Azure Blob Storage.
* **`status`**: Keeps track of what the AI/ML Azure Function is currently doing.
* **`summary` & `extracted_text`**: Columns ready to receive the output from your Azure ML processing.

---

## 4. Note on Security

Because we are using **Microsoft Entra ID** for authentication instead of Supabase Auth, we do **not** use Supabase's native Row Level Security (RLS) policies.

Instead, your **FastAPI backend** acts as the security enforcer. 
1. FastAPI will validate the user's Microsoft token.
2. FastAPI extracts the `user_id` from the token.
3. Every database query from FastAPI will explicitly filter by that user: `SELECT * FROM documents WHERE user_id = [Entra ID]`. 

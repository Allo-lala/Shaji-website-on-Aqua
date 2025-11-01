-- Create documents table to store academic documents
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- 'diploma', 'transcript', 'certificate'
  title VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  issue_date DATE,
  file_url TEXT,
  file_hash VARCHAR(66), -- Blockchain hash
  verification_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  aqua_proof_id VARCHAR(255), -- Aqua SDK proof identifier
  metadata JSONB, -- Additional document metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_verification_status ON documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_documents_file_hash ON documents(file_hash);

-- Add comment to table
COMMENT ON TABLE documents IS 'Stores academic documents with verification status';

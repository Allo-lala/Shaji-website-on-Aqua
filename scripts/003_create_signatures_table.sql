-- Create signatures table to store digital signature requests
CREATE TABLE IF NOT EXISTS signatures (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
  requester_name VARCHAR(255) NOT NULL,
  requester_email VARCHAR(255),
  purpose TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'rejected'
  signature_hash VARCHAR(66), -- Cryptographic signature hash
  signed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_signatures_document_id ON signatures(document_id);
CREATE INDEX IF NOT EXISTS idx_signatures_status ON signatures(status);

-- Add comment to table
COMMENT ON TABLE signatures IS 'Stores digital signature requests and completed signatures';

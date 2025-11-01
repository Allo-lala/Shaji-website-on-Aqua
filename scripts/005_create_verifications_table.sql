-- Create verifications table to store Aqua SDK verification results
CREATE TABLE IF NOT EXISTS verifications (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  verifier_wallet VARCHAR(42),
  verification_type VARCHAR(50) NOT NULL, -- 'aqua_proof', 'blockchain', 'manual'
  proof_data JSONB, -- Aqua SDK proof data
  blockchain_tx_hash VARCHAR(66),
  verification_result VARCHAR(20) NOT NULL, -- 'verified', 'failed', 'pending'
  verification_message TEXT,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_verifications_document_id ON verifications(document_id);
CREATE INDEX IF NOT EXISTS idx_verifications_result ON verifications(verification_result);
CREATE INDEX IF NOT EXISTS idx_verifications_tx_hash ON verifications(blockchain_tx_hash);

-- Add comment to table
COMMENT ON TABLE verifications IS 'Stores verification results from Aqua SDK and blockchain';

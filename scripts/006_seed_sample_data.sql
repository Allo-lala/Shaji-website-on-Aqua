-- Seed sample data for testing

-- Insert sample user
INSERT INTO users (wallet_address, name, email) 
VALUES ('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'John Doe', 'john@example.com')
ON CONFLICT (wallet_address) DO NOTHING;

-- Get the user id
DO $$
DECLARE
  sample_user_id INTEGER;
BEGIN
  SELECT id INTO sample_user_id FROM users WHERE wallet_address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  -- Insert sample documents
  INSERT INTO documents (user_id, document_type, title, institution, issue_date, verification_status, file_hash)
  VALUES 
    (sample_user_id, 'diploma', 'Bachelor of Science in Computer Science', 'MIT', '2023-05-15', 'verified', '0xabc123...'),
    (sample_user_id, 'transcript', 'Academic Transcript 2019-2023', 'MIT', '2023-05-15', 'verified', '0xdef456...'),
    (sample_user_id, 'certificate', 'Blockchain Development Certificate', 'Stanford Online', '2024-01-10', 'pending', '0xghi789...');

  -- Insert sample signatures
  INSERT INTO signatures (user_id, requester_name, requester_email, purpose, status, signature_hash)
  VALUES 
    (sample_user_id, 'Tech Corp HR', 'hr@techcorp.com', 'Employment Verification', 'completed', '0x1a2b3c...'),
    (sample_user_id, 'University Admissions', 'admissions@university.edu', 'Graduate School Application', 'pending', NULL);
END $$;

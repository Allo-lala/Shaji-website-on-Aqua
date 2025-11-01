-- Create shared_files table to manage file sharing
CREATE TABLE IF NOT EXISTS shared_files (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  shared_with_email VARCHAR(255),
  shared_with_wallet VARCHAR(42),
  access_type VARCHAR(20) DEFAULT 'view', -- 'view', 'download'
  share_link VARCHAR(255) UNIQUE,
  access_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_shared_files_user_id ON shared_files(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_files_document_id ON shared_files(document_id);
CREATE INDEX IF NOT EXISTS idx_shared_files_share_link ON shared_files(share_link);
CREATE INDEX IF NOT EXISTS idx_shared_files_is_active ON shared_files(is_active);

-- Add comment to table
COMMENT ON TABLE shared_files IS 'Manages file sharing with access control and tracking';

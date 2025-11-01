import { neon } from "@neondatabase/serverless"

// Create a reusable SQL client
export const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

// Database query helpers
export async function getUserByWallet(walletAddress: string) {
  const users = await sql`
    SELECT * FROM users WHERE wallet_address = ${walletAddress}
  `
  return users[0] || null
}

export async function createUser(walletAddress: string, name?: string, email?: string) {
  const users = await sql`
    INSERT INTO users (wallet_address, name, email)
    VALUES (${walletAddress}, ${name || null}, ${email || null})
    ON CONFLICT (wallet_address) DO UPDATE
    SET updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `
  return users[0]
}

export async function getUserDocuments(userId: number) {
  return await sql`
    SELECT * FROM documents 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
}

export async function createDocument(data: {
  userId: number
  documentType: string
  title: string
  institution: string
  issueDate?: string
  fileUrl?: string
  fileHash?: string
}) {
  const documents = await sql`
    INSERT INTO documents (
      user_id, document_type, title, institution, 
      issue_date, file_url, file_hash
    ) VALUES (
      ${data.userId}, ${data.documentType}, ${data.title}, 
      ${data.institution}, ${data.issueDate || null}, 
      ${data.fileUrl || null}, ${data.fileHash || null}
    )
    RETURNING *
  `
  return documents[0]
}

export async function getUserSignatures(userId: number) {
  return await sql`
    SELECT * FROM signatures 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `
}

export async function getSharedFiles(userId: number) {
  return await sql`
    SELECT sf.*, d.title as document_title, d.document_type
    FROM shared_files sf
    JOIN documents d ON sf.document_id = d.id
    WHERE sf.user_id = ${userId}
    ORDER BY sf.created_at DESC
  `
}

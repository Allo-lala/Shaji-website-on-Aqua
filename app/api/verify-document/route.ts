import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { documentId, proofId, verificationResult, blockchainTxHash, walletAddress } = body

    // Validate required fields
    if (!documentId || !proofId || !verificationResult) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update document verification status
    await sql`
      UPDATE documents 
      SET 
        verification_status = ${verificationResult.isValid ? "verified" : "failed"},
        aqua_proof_id = ${proofId},
        file_hash = ${verificationResult.documentHash || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${documentId}
    `

    // Insert verification record
    await sql`
      INSERT INTO verifications (
        document_id,
        verifier_wallet,
        verification_type,
        proof_data,
        blockchain_tx_hash,
        verification_result,
        verification_message
      ) VALUES (
        ${documentId},
        ${walletAddress},
        'aqua_proof',
        ${JSON.stringify(verificationResult)},
        ${blockchainTxHash || null},
        ${verificationResult.isValid ? "verified" : "failed"},
        ${verificationResult.message}
      )
    `

    return NextResponse.json({
      success: true,
      message: "Document verification recorded",
      verificationResult,
    })
  } catch (error) {
    console.error("[v0] Error in verify-document API:", error)
    return NextResponse.json({ error: "Failed to record verification" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get("documentId")

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    // Get verification history for a document
    const verifications = await sql`
      SELECT * FROM verifications 
      WHERE document_id = ${documentId}
      ORDER BY verified_at DESC
    `

    return NextResponse.json({
      success: true,
      verifications,
    })
  } catch (error) {
    console.error("[v0] Error fetching verifications:", error)
    return NextResponse.json({ error: "Failed to fetch verifications" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { getUserByWallet, createUser, getUserDocuments, createDocument } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("walletAddress")

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Get or create user
    let user = await getUserByWallet(walletAddress)
    if (!user) {
      user = await createUser(walletAddress)
    }

    // Get user's documents
    const documents = await getUserDocuments(user.id)

    return NextResponse.json({
      success: true,
      documents,
    })
  } catch (error) {
    console.error("[v0] Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, documentType, title, institution, issueDate, fileUrl, fileHash } = body

    if (!walletAddress || !documentType || !title || !institution) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get or create user
    let user = await getUserByWallet(walletAddress)
    if (!user) {
      user = await createUser(walletAddress)
    }

    // Create document
    const document = await createDocument({
      userId: user.id,
      documentType,
      title,
      institution,
      issueDate,
      fileUrl,
      fileHash,
    })

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error("[v0] Error creating document:", error)
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}

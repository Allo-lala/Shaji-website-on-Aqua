import { type NextRequest, NextResponse } from "next/server"
import { getUserByWallet, createUser, getSharedFiles } from "@/lib/db"

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

    // Get user's shared files
    const sharedFiles = await getSharedFiles(user.id)

    return NextResponse.json({
      success: true,
      sharedFiles,
    })
  } catch (error) {
    console.error("[v0] Error fetching shared files:", error)
    return NextResponse.json({ error: "Failed to fetch shared files" }, { status: 500 })
  }
}

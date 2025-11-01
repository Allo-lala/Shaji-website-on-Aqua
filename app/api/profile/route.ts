import { type NextRequest, NextResponse } from "next/server"
import { sql, getUserByWallet, createUser } from "@/lib/db"

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

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("[v0] Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, name, email } = body

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Update user profile
    const users = await sql`
      UPDATE users 
      SET 
        name = ${name || null},
        email = ${email || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE wallet_address = ${walletAddress}
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      user: users[0],
    })
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

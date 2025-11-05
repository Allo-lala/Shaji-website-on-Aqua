import { Aquafier } from "aqua-js-sdk/web"
// import Aquafier from 'aqua-js-sdk/react-native';
import { ethers } from "ethers"

// Initialize Aqua SDK
let aquafierInstance: Aquafier | null = null

export async function getAquafier(): Promise<Aquafier> {
  if (aquafierInstance) {
    return aquafierInstance
  }

  // Initialize with ethers provider
  // In production, I should use the user's wallet provider
  const provider = new ethers.BrowserProvider(window.ethereum as any)
  const signer = await provider.getSigner()

  aquafierInstance = new Aquafier({
    signer,
    // Add any additional Aqua configuration here
  })

  return aquafierInstance
}

export interface DocumentProof {
  proofId: string
  documentHash: string
  timestamp: number
  signature: string
  metadata?: Record<string, any>
}

export interface VerificationResult {
  isValid: boolean
  proofId: string
  verifiedAt: number
  message: string
  blockchainTxHash?: string
}

/**
 * Create a cryptographic proof for a document using Aqua SDK
 */
export async function createDocumentProof(
  documentData: {
    title: string
    institution: string
    issueDate: string
    documentType: string
  },
  fileBuffer: ArrayBuffer,
): Promise<DocumentProof> {
  try {
    const aquafier = await getAquafier()

    // Create hash of the document
    const documentHash = ethers.keccak256(new Uint8Array(fileBuffer))

    // Create proof using Aqua SDK
    const proof = await aquafier.createProof({
      data: {
        documentHash,
        ...documentData,
      },
      metadata: {
        timestamp: Date.now(),
        version: "1.0",
      },
    })

    return {
      proofId: proof.id,
      documentHash,
      timestamp: Date.now(),
      signature: proof.signature,
      metadata: proof.metadata,
    }
  } catch (error) {
    console.error("[v0] Error creating document proof:", error)
    throw new Error("Failed to create document proof")
  }
}

/**
 * Verify a document using its proof ID
 */
export async function verifyDocumentProof(proofId: string, documentHash: string): Promise<VerificationResult> {
  try {
    const aquafier = await getAquafier()

    // Verify the proof using Aqua SDK
    const verification = await aquafier.verifyProof({
      proofId,
      documentHash,
    })

    return {
      isValid: verification.isValid,
      proofId,
      verifiedAt: Date.now(),
      message: verification.isValid ? "Document verified successfully" : "Document verification failed",
      blockchainTxHash: verification.txHash,
    }
  } catch (error) {
    console.error("[v0] Error verifying document:", error)
    return {
      isValid: false,
      proofId,
      verifiedAt: Date.now(),
      message: "Verification error: " + (error as Error).message,
    }
  }
}

/**
 * Get proof details from Aqua SDK
 */
export async function getProofDetails(proofId: string) {
  try {
    const aquafier = await getAquafier()
    const proof = await aquafier.getProof(proofId)
    return proof
  } catch (error) {
    console.error("[v0] Error getting proof details:", error)
    throw new Error("Failed to get proof details")
  }
}

/**
 * Create a hash of a file for verification
 */
export function hashFile(fileBuffer: ArrayBuffer): string {
  return ethers.keccak256(new Uint8Array(fileBuffer))
}

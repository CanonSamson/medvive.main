import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import {
  createDBAdmin,
  getDBAdmin,
  updateDBAdmin,
} from "@/app/api/_utils/firebase/admin-database";
import { sendEmail } from "@/app/api/_utils/emailService";

interface OTPData {
  otp: string;
  email: string;
  expiresAt: string;
  attempts: number;
  verified: boolean;
  createdAt: string;
  verifiedAt?: string;
}

interface PatientData {
  email: string;
  fullName?: string;
  emailVerification?: boolean;
  emailVerifiedAt?: string;
}

// Generate a 5-digit OTP
function generateOTP(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Send OTP verification to user
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate input
    const result = z
      .object({
        userId: z.string(),
      })
      .safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues,
          success: false,
        },
        { status: 400 }
      );
    }

    const { userId } = result.data;

    const patientRecord = await getDBAdmin("patients", userId);

    if (!patientRecord?.data) {
      return NextResponse.json(
        {
          error: "Patient not found",
          success: false,
          patientRecord,
        },
        { status: 404 }
      );
    }

    const patientData = patientRecord.data as PatientData;
    const email = patientData.email;
    const fullName = patientData.fullName;
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Store OTP in Firebase (using email as document ID for easy retrieval)
    const otpData: OTPData = {
      otp,
      email,
      expiresAt: expiresAt.toISOString(),
      attempts: 0,
      verified: false,
      createdAt: new Date().toISOString(),
    };

    // Create or update OTP record using Admin SDK
    await createDBAdmin(
      "email-verification-otps",
      email.replace(/[.#$\[\]]/g, "_"),
      otpData
    );

    // Send OTP email
    try {
      await sendEmail(
        email,
        "Email Verification - Your OTP Code",
        "otp-verification",
        {
          fullName: fullName || "User",
          otp: otp,
          expiryMinutes: "5",
        }
      );

      return NextResponse.json(
        {
          message: "OTP sent successfully",
          success: true,
          expiresAt: expiresAt.toISOString(),
        },
        { status: 201 }
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        {
          error: "Failed to send OTP email",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}

// Verify OTP
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate input
    const result = z
      .object({
        otp: z.string().length(5, "OTP must be 5 digits"),
        userId: z.string(),
      })
      .safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues,
          success: false,
        },
        { status: 400 }
      );
    }

    const { otp, userId } = result.data;

    const patientRecord = await getDBAdmin("patients", userId);

    if (!patientRecord?.data) {
      return NextResponse.json(
        {
          error: "Patient not found",
          success: false,
          patientRecord,
        },
        { status: 404 }
      );
    }
    
    const patientData = patientRecord.data as PatientData;
    const email = patientData.email;
    const emailKey = email.replace(/[.#$\[\]]/g, "_");

    // Get OTP record from Firebase using Admin SDK
    const otpRecord = await getDBAdmin("email-verification-otps", emailKey);

    if (!otpRecord.success || !otpRecord.data) {
      return NextResponse.json(
        {
          error: "OTP not found or expired",
          success: false,
        },
        { status: 404 }
      );
    }

    const otpData = otpRecord.data as OTPData;

    // Check if OTP is already verified
    if (otpData.verified) {
      return NextResponse.json(
        {
          error: "OTP already used",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    const now = new Date();
    const expiresAt = new Date(otpData.expiresAt);
    if (now > expiresAt) {
      return NextResponse.json(
        {
          error: "OTP has expired",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check attempt limit
    if (otpData.attempts >= 3) {
      return NextResponse.json(
        {
          error: "Maximum verification attempts exceeded",
          success: false,
        },
        { status: 429 }
      );
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      // Increment attempts
      await updateDBAdmin("email-verification-otps", emailKey, {
        attempts: otpData.attempts + 1,
      });

      return NextResponse.json(
        {
          error: "Invalid OTP",
          success: false,
          attemptsLeft: 2 - otpData.attempts,
        },
        { status: 400 }
      );
    }

    // OTP is valid - mark as verified
    await Promise.all([
      updateDBAdmin("email-verification-otps", emailKey, {
        verified: true,
        verifiedAt: new Date().toISOString(),
      }),
      updateDBAdmin("patients", userId, {
        emailVerification: true,
        emailVerifiedAt: new Date().toISOString(),
      }),
    ]);
    
    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}

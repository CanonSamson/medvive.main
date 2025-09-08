import { NextRequest, NextResponse } from "next/server";
import { getDBAdmin, createDBAdmin } from "@/app/api/_utils/firebase/admin-database";

interface TestData {
  message: string;
  timestamp: string;
  status?: string;
  type?: string;
}

interface HealthCheckResponse {
  success: boolean;
  message?: string;
  tests?: {
    write: string;
    read: string;
    dataIntegrity: string;
  };
  testData?: {
    written: TestData;
    retrieved: any;
  };
  timestamp: string;
  projectId?: string;
  error?: string;
  details?: string;
  troubleshooting?: {
    checkEnvVars: string;
    checkServiceAccount: string;
    checkPermissions: string;
  };
}

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  try {
    const timestamp = new Date().toISOString();
    const testDocId = `health-check-${Date.now()}`;
    
    // Test data to write and read
    const testData: TestData = {
      message: "Firebase Admin SDK Health Check",
      timestamp: timestamp,
      status: "testing"
    };

    console.log("Starting Firebase Admin SDK health check...");

    // Test 1: Write operation
    console.log("Testing write operation...");
    const writeResult = await createDBAdmin("health-checks", testDocId, testData);
    
    if (!writeResult.success) {
      throw new Error("Write operation failed");
    }

    // Test 2: Read operation
    console.log("Testing read operation...");
    const readResult = await getDBAdmin("health-checks", testDocId);
    
    if (!readResult.success || !readResult.data) {
      throw new Error("Read operation failed");
    }

    // Test 3: Verify data integrity
    const retrievedData = readResult.data;
    if (retrievedData.message !== testData.message) {
      throw new Error("Data integrity check failed");
    }

    console.log("All Firebase Admin SDK tests passed!");

    return NextResponse.json(
      {
        success: true,
        message: "Firebase Admin SDK is working correctly",
        tests: {
          write: "✅ Passed",
          read: "✅ Passed",
          dataIntegrity: "✅ Passed"
        },
        testData: {
          written: testData,
          retrieved: retrievedData
        },
        timestamp: timestamp,
        projectId: process.env.FIREBASE_PROJECT_ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Firebase Admin SDK health check failed:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Firebase Admin SDK health check failed",
        details: (error as Error).message,
        timestamp: new Date().toISOString(),
        troubleshooting: {
          checkEnvVars: "Ensure FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL are set",
          checkServiceAccount: "Verify service account credentials are correct",
          checkPermissions: "Ensure service account has Firestore permissions"
        }
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to test with custom data
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { testMessage = "Custom test message" }: { testMessage?: string } = body;
    
    const timestamp = new Date().toISOString();
    const testDocId = `custom-test-${Date.now()}`;
    
    const testData: TestData = {
      message: testMessage,
      timestamp: timestamp,
      type: "custom-test"
    };

    // Write test data
    await createDBAdmin("health-checks", testDocId, testData);
    
    // Read it back
    const result = await getDBAdmin("health-checks", testDocId);
    
    return NextResponse.json(
      {
        success: true,
        message: "Custom Firebase Admin test completed",
        testData: result.data,
        timestamp: timestamp
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Custom Firebase Admin test failed:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Custom Firebase Admin test failed",
        details: (error as Error).message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
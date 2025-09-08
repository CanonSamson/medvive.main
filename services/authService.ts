import axios from "axios";

interface VerifySignUpEmailParams {
  otp: string;
  userId: string;
}

interface ApiResponse {
  success: boolean;
  [key: string]: any;
}

export class AuthService {
  verifySignUpEmail = async ({ otp, userId }: VerifySignUpEmailParams): Promise<ApiResponse> => {
    try {
      const res = await axios.patch(
        `/api/v1/auth/verify-sign-up-otp`,
        {
          otp,
          userId,
        }
      );
      console.log("Verify Email Response: ", res);
      return res?.data;
    } catch (error: any) {
      console.error("Verify Email Error: ", error, error.response?.data);
      return error.response?.data || { success: false };
    }
  };
}

export const authService = new AuthService();

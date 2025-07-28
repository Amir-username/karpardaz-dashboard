import { BASE_LINK } from "@/config";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define response type for better type safety
interface LoginResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
}

// Define error types
interface LoginError {
  message: string;
  status?: number;
}

export const fetchLogin = async (
  username: string, 
  password: string
): Promise<{ success: boolean; data?: LoginResponse; error?: LoginError }> => {
  try {
    // Input validation
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    if (username.trim().length === 0 || password.trim().length === 0) {
      throw new Error("Username and password cannot be empty");
    }

    const res = await axios.post<LoginResponse>(
      `${BASE_LINK}admin/login`,
      {
        grant_type: "password",
        username: username.trim(),
        password: password
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const data = res.data;
    
    // Validate response data
    if (!data.access_token) {
      throw new Error("Invalid response: access token not found");
    }

    // Store token securely
    Cookies.set("dashboard_token", data.access_token, {
      expires: 30,
      secure: true,
      sameSite: "strict",
      httpOnly: false, // Note: js-cookie can't set httpOnly, consider using a more secure method
    });

    // Store additional token info if available
    if (data.refresh_token) {
      Cookies.set("dashboard_refresh_token", data.refresh_token, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });
    }

    return { success: true, data };

  } catch (error) {
    console.error("Login error:", error);
    
    let errorMessage = "Login failed";
    let status: number | undefined;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      status = axiosError.response?.status;
      
      if (status === 401) {
        errorMessage = "Invalid username or password";
      } else if (status === 403) {
        errorMessage = "Access denied";
      } else if (status === 404) {
        errorMessage = "Login endpoint not found";
      } else if (status === 500) {
        errorMessage = "Server error. Please try again later";
      } else if (axiosError.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please check your connection";
      } else if (axiosError.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection";
             } else {
         errorMessage = (axiosError.response?.data as any)?.message || "Login failed";
       }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { 
      success: false, 
      error: { 
        message: errorMessage, 
        status 
      } 
    };
  }
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchLogin } from "@/fetch/auth/fetchLogin";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("لطفاً نام کاربری و رمز عبور را وارد کنید");
      setIsLoading(false);
      return;
    }

    if (username.trim().length < 3 || password.trim().length < 5) {
      setError("نام کاربری باید حداقل 3 کاراکتر و رمز عبور حداقل 5 کاراکتر باشد");
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetchLogin(username.trim(), password);

      if (result.success) {
        // Login successful
        setUsername("");
        setPassword("");
        setError("");
        navigator("/");
      } else {
        // Login failed - show error message
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      // Fallback error handling for unexpected errors
      console.error("Unexpected login error:", error);
      setError("خطای غیرمنتظره در ورود به سیستم");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <Card className="md:w-96 w-72 gap-16">
        <CardHeader className="flex items-center justify-center">
          <h1 className="text-3xl">ورود ادمین</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="نام کاربری"
              disabled={isLoading}
            />
            <div className="relative">
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                data-testid="password-toggle"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </span>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                disabled={isLoading}
              />
            </div>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;

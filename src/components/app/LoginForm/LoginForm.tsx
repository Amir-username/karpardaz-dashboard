import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchLogin } from "@/fetch/auth/fetchLogin";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(username);

    if (username.length > 2 && password.length > 4) {
      try {
        await fetchLogin(username, password);
        setUsername("");
        setPassword("");
        navigator("/");
      } catch (error) {
        console.error("Login failed:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <main className="flex justify-center items-center">
      <Card className="w-96 gap-16">
        <CardHeader className="flex items-center justify-center">
          <h1 className="text-3xl">ورود ادمین</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="نام کاربری"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="رمز عبور "
            />
            <Button className="cursor-pointer" type="submit">
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginForm;

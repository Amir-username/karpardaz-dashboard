import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_LINK } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchLogin = async () => {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", username);
      formData.append("password", password);
      const res = await axios.post(BASE_LINK + "admin/login", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await res.data;

      Cookies.set("dashboard_token", data.access_token, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });
    };

    if (username.length > 2 && password.length > 4) {
      fetchLogin();
      setUsername("");
      setPassword("");
      navigator('/')
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

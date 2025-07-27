import { BASE_LINK } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchLogin = async (username: string, password: string) => {
  // const formData = new URLSearchParams();
  // formData.append("grant_type", "password");
  // formData.append("username", username);
  // formData.append("password", password);

  const res = await axios.post(BASE_LINK + "admin/login", {
    "grant_type": "password",
    "username": username,
    "password": password
  }, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(res);

  const data = await res.data;
  console.log(data);

  Cookies.set("dashboard_token", data.access_token, {
    expires: 30,
    secure: true,
    sameSite: "strict",
  });
};
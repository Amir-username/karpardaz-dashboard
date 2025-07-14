import { BASE_LINK } from "@/config";
import axios from "axios";

type fetchLoginEmployerType = {
  username: string;
  password: string;
};

export async function fetchLoginEmployer({
  username,
  password,
}: fetchLoginEmployerType) {
  const res = await axios.post(
    BASE_LINK + "employer/login/",
    { username: username, password: password },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (res.status == 200) {
    const data = await res.data;
    const token = await data.access_token;

    return token;
  }
}

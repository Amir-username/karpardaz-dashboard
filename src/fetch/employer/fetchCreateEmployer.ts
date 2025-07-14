import { BASE_LINK } from "@/config";
import axios, { AxiosError } from "axios";

type fetchCreateEmployerBody = {
  companyName: string;
  email: string;
  password: string;
};

export async function fetchCreateEmployer(body: fetchCreateEmployerBody) {
  let status = 200;
  try {
    const res = await axios.post(
      BASE_LINK + "employers/",
      {
        company_name: body.companyName,
        email: body.email,
        password: body.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    status = res.status;
  } catch (error) {
    if (error instanceof AxiosError) {
      status = error.status!;
    }
  }

  return status;
}

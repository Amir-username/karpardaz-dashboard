import axios, { AxiosError } from "axios";
import { BASE_LINK } from "@/config";

type fetchCreateJobSeekerBody = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
};

export async function fetchCreateJobSeeker(body: fetchCreateJobSeekerBody) {
  let status = 200;
  try {
    const res = await axios.post(
      BASE_LINK + "jobseekers/",
      {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phonenumber: body.phonenumber,
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

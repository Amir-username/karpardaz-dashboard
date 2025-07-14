import { BASE_LINK } from "@/config";

export async function fetchCurrentEmployer(token: string) {
  try {
    const res = await fetch(BASE_LINK + "current-employer/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

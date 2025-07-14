import { BASE_LINK } from "@/config";

export async function fetchAdvertiseDetail(id: number) {
  try {
    const res = await fetch(BASE_LINK + `advertisements/${id}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

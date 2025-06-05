import { BASE_LINK } from "../config";

export async function fetchEmployerDetail(id: number) {
  try {
    const res = await fetch(BASE_LINK + `employer-detail/${id}`);
    const data = await res.json();

    return data
  } catch (error) {
    console.log(error);
  }
}

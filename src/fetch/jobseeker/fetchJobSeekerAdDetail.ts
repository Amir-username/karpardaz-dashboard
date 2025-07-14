import { BASE_LINK } from "@/config";

export async function fetchJobSeekerAdDetail(id: number) {
  try {
    const res = await fetch(BASE_LINK + `jobseeker-ads/${id}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

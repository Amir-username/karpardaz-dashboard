import { BASE_LINK } from "@/config";

export async function fetchAdvertisements() {
    const res = await fetch(BASE_LINK + "advertisements");
    const jobsData = await res.json();
    return jobsData;
  }
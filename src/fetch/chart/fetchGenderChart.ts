import { BASE_LINK } from "@/config";
import axios from "axios";

export async function fetchGenderChart() {
  const res = await axios.get(BASE_LINK + "charts/gender");
  if (res.status === 200) {
    const data = await res.data
    return data
  }
}

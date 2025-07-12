import { BASE_LINK } from "@/config";
import axios from "axios";

export async function fetchPositionChart() {
  const res = await axios.get(BASE_LINK + "charts/position");
  if (res.status === 200) {
    const data = await res.data;
    return data;
  }
}

import { BASE_LINK } from "@/config";
import axios from "axios";

export async function fetchUsersChart() {
  const res = await axios.get(BASE_LINK + "charts/users");
  if (res.status === 200) {
    const data = await res.data;
    return data;
  }
}

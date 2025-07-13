import { BASE_LINK } from "@/config";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useFetchChart<T>(url: string) {
  const [chartData, setChartData] = useState<T[]>();
  const [error, setError] = useState<string>();

  const getChartData = async () => {
    const res = await axios.get(BASE_LINK + url);
    if (res.status === 200) {
      const data = await res.data;
      setChartData([data]);
      console.log(chartData)
    }
  };

  useEffect(() => {
    try {
      getChartData();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    }
  }, []);

  return {
    chartData,
    error
  }
}

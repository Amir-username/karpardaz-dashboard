import { BASE_LINK } from "../config";
import {
  FilterType,
  SearchParams,
  buildQuery,
} from "../employerAdvertise/fetchSearchAdvertise";

export async function fetchSearchJobSeekerAds(
  query: string,
  filters: FilterType,
  signal: AbortSignal
) {
  const searchParams: SearchParams = {
    q: query,
    is_internship: filters.isInternship ? filters.isInternship : undefined,
    is_remote: filters.isRemote ? filters.isRemote : undefined,
    is_portfolio: filters.isPortfolio ? filters.isPortfolio : undefined,
    salary: filters.salary,
    experience: filters.experience,
    gender: filters.gender,
    position: filters.position,
  };
  const params = buildQuery(searchParams);
  const res = await fetch(BASE_LINK + `jobseeker-ads/search/?${params}`, {
    headers: {
      accept: "application/json",
    },
    signal: signal,
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const data = await res.json();

  return data;
}

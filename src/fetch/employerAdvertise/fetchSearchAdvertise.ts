import {
  ExperienceType,
  GenderType,
  PositionType,
  SalaryType,
} from "@/models/filterTypes";
import { BASE_LINK } from "../config";

export type SearchParams = {
  q?: string;
  is_internship?: boolean;
  is_remote?: boolean;
  is_portfolio?: boolean;
  city?: string;
  salary?: SalaryType | string;
  experience?: ExperienceType | string;
  gender?: GenderType | string;
  position?: PositionType | string;
};

// Utility to build the query string
export function buildQuery(params: SearchParams): string {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.append("search_q", params.q);
  if (params.is_internship !== undefined)
    searchParams.append("is_internship", String(params.is_internship));
  if (params.is_remote !== undefined)
    searchParams.append("is_remote", String(params.is_remote));
  if (params.is_portfolio !== undefined)
    searchParams.append("is_portfolio", String(params.is_portfolio));
  if (params.city !== undefined && !(params.city.length === 0))
    searchParams.append("city_q", String(params.city));
  if (params.salary !== undefined && !(params.salary.length === 0))
    searchParams.append("salary", String(params.salary));
  if (params.experience !== undefined && !(params.experience.length === 0))
    searchParams.append("experience", String(params.experience));
  if (params.gender !== undefined && !(params.gender.length === 0))
    searchParams.append("gender", String(params.gender));
  if (params.position !== undefined && !(params.position.length === 0))
    searchParams.append(
      "position",
      String(params.position)
    );
  return searchParams.toString();
}

export type FilterType = {
  isRemote?: boolean;
  isInternship?: boolean;
  isPortfolio?: boolean;
  city?: string;
  salary?: SalaryType | string;
  experience?: ExperienceType | string;
  gender?: GenderType | string;
  position?: PositionType | string;
};
export async function fetchSearchAdvertise(
  query: string,
  filters: FilterType,
  signal: AbortSignal
) {
  const searchParams: SearchParams = {
    q: query,
    is_internship: filters.isInternship ? filters.isInternship : undefined,
    is_remote: filters.isRemote ? filters.isRemote : undefined,
    is_portfolio: filters.isPortfolio ? filters.isPortfolio : undefined,
    city: filters.city,
    salary: filters.salary,
    experience: filters.experience,
    gender: filters.gender,
    position: filters.position,
  };
  const params = buildQuery(searchParams);
  const res = await fetch(BASE_LINK + `jobs/search/?${params}`, {
    headers: {
      accept: "application/json",
    },
    signal: signal,
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const data = await res.json();

  return data;
}

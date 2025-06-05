import { AdRequestModel } from "./AdRequest";

export type AdvertiseModel = {
  title: string;
  position: "junior" | "senior" | "midlevel";
  experience: string;
  job_group: string;
  city: string;
  is_remote: boolean;
  is_internship: boolean;
  gender: "male" | "female" | "no difference";
  benefits: string[];
  technologies: string[];
  is_portfolio: boolean;
  description: string;
  id: number;
  employer_id: number;
  salary: string;
  requests?: AdRequestModel[]
};

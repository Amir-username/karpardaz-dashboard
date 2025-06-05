export type JobSeekrAdModel = {
  id: number;
  title: string;
  description: string;
  jobseeker_id: number;
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
  salary: string;
};

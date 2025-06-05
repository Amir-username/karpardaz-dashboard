export type JobSeekerDetailModel = {
  id?: number;
  firstname?: string;
  lastname?: string;
  position: "junior" | "senior" | "midlevel";
  experience:
    | "بدون سابقه کار"
    | "۱ تا ۲ سال سابفه کار"
    | "۲ تا ۴ سال سابقه کار"
    | "۴ سال به بالا";
  salary:
    | "۵ تا ۱۰ میلیون تومان"
    | "۱۰ تا ۲۰ میلیون تومان"
    | "۲۰ تا ۴۰ میلیون تومان"
    | "۴۰ میلیون به بالا"
    | "توافقی";
  job_group: string;
  is_remote: boolean;
  is_internship: boolean;
  gender: "male" | "female" | "no difference";
  technologies: string[];
  is_portfolio: boolean;
  jobseeker_id?: number;
  city: string
  description: string
  educations: string[]
  specialized_jobs: string[]
};

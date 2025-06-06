import { Table, TableCell, TableRow } from "@/components/ui/table";
import { BASE_LINK } from "@/config";
import type { JobSeekerModel } from "@/models/JobSeeker";
import { useEffect, useState } from "react";

function JobSeekersPage() {
  const [jobseekers, setJobseekers] = useState<JobSeekerModel[]>([]);

  useEffect(() => {
    const fetchJobseekers = async () => {
      const res = await fetch(BASE_LINK + "jobseekers/");
      const data = await res.json();

      console.log(data);
      if (res.status === 200) setJobseekers(data.jobseekers);
    };

    fetchJobseekers();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست کارجو</h1>
      <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
        <Table className="p-2">
          <TableRow className="flex w-full font-bold p-2">
            <TableCell className="w-64">شناسه</TableCell>
            <TableCell className="w-64">نام کارجو</TableCell>
            <TableCell className="w-64">ایمیل</TableCell>
          </TableRow>
          {jobseekers.map((jobseeker) => (
            <TableRow className="flex w-full p-2" key={jobseeker.id}>
              <TableCell className="w-64">{jobseeker.id}</TableCell>
              <TableCell className="w-64">{`${jobseeker.firstname} ${jobseeker.lastname}`}</TableCell>
              <TableCell className="w-64">{jobseeker.email}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default JobSeekersPage;

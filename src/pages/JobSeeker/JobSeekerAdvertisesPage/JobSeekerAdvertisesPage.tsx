import { Table, TableCell, TableRow } from "@/components/ui/table";
import { BASE_LINK } from "@/config";
import type { JobSeekrAdModel } from "@/models/JobSeekerAd";
import { useEffect, useState } from "react";

function JobSeekerAdvertisesPage() {
  const [jobseekerAds, setJobseekerAds] = useState<JobSeekrAdModel[]>([]);

  useEffect(() => {
    const fetchJobseekerAds = async () => {
      const res = await fetch(BASE_LINK + "jobseeker-ads/");
      const data = await res.json();

      if (res.status === 200) setJobseekerAds(data.advertises);
    };

    fetchJobseekerAds();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست آگهی کارجو</h1>
      <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
        <Table className="p-2">
          <TableRow className="flex w-full font-bold p-2">
            <TableCell className="w-64">شناسه</TableCell>
            <TableCell className="w-64">عنوان</TableCell>
            <TableCell className="w-64">سابقه کاری</TableCell>
            <TableCell className="w-64">گروه شغلی</TableCell>
          </TableRow>
          {jobseekerAds.map((advertise) => (
            <TableRow className="flex w-full p-2" key={advertise.id}>
              <TableCell className="w-64">{advertise.id}</TableCell>
              <TableCell className="w-64">{advertise.title}</TableCell>
              <TableCell className="w-64">{advertise.experience}</TableCell>
              <TableCell className="w-64">{advertise.job_group}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default JobSeekerAdvertisesPage;

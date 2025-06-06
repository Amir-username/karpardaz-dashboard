import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { fetchJobSeekerDetail } from "@/fetch/jobseeker/fetchJobSeekerDetail";
import type { JobSeekerDetailModel } from "@/models/JobSeekerDetail";
import { useState } from "react";

function JobSeekersDetailsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [jobseekerDetail, setjobSeekerDetail] = useState<JobSeekerDetailModel>();

  const handleSearchDetails = () => {
    const fetchDetails = async () => {
      const data = await fetchJobSeekerDetail(Number(searchInput));
      setjobSeekerDetail(data);
    };

    fetchDetails();
    setSearchInput("");
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست جزئیات کارجو</h1>
      <div className="flex gap-1 w-96">
        <Button onClick={handleSearchDetails}>جستجو</Button>
        <Input
          type="number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="شناسه کارجو"
        />
      </div>
      {jobseekerDetail && (
        <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
          <Table className="p-2">
            <TableRow className="flex w-full font-bold p-2">
              <TableCell className="w-64">شناسه</TableCell>
              <TableCell className="w-64">نام کارجو</TableCell>
              <TableCell className="w-64">سابقه کاری</TableCell>
              <TableCell className="w-64">جنسیت</TableCell>
            </TableRow>
            <TableRow className="flex w-full p-2">
              <TableCell className="w-64">{jobseekerDetail.id}</TableCell>
              <TableCell className="w-64">
                {`${jobseekerDetail.firstname} ${jobseekerDetail.lastname}`}
              </TableCell>
              <TableCell className="w-64">{jobseekerDetail.experience}</TableCell>
              <TableCell className="w-64">
                {jobseekerDetail.gender}
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </div>
  );
}

export default JobSeekersDetailsPage;

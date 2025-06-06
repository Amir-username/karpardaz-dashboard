import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { BASE_LINK } from "@/config";
import type { AdRequestModel } from "@/models/AdRequest";
import { useState } from "react";

function JobSeekerRequestsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [requests, setRequests] = useState<AdRequestModel[]>([]);

  const handleSearchRequests = () => {
    const fetchRequests = async () => {
      const res = await fetch(
        BASE_LINK + `jobseeker-ads-requests/${Number(searchInput)}`
      );
      const data = await res.json();

      if (res.status === 200) setRequests(data);
    };

    fetchRequests();
    setSearchInput("");
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست درخواست های کارجو</h1>
      <div className="flex gap-1 w-96">
        <Button onClick={handleSearchRequests}>جستجو</Button>
        <Input
          type="number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="شناسه آگهی"
        />
      </div>
      {requests.length > 0 && (
        <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
          <Table className="p-2">
            <TableRow className="flex w-full font-bold p-2">
              <TableCell className="w-64">شناسه</TableCell>
              <TableCell className="w-64">شناسه آگهی</TableCell>
              <TableCell className="w-64">وضعیت درخواست</TableCell>
            </TableRow>
            {requests.map((req) => (
              <TableRow className="flex w-full p-2" key={req.id}>
                <TableCell className="w-64">{req.id}</TableCell>
                <TableCell className="w-64">{req.advertise_id}</TableCell>
                <TableCell className="w-64">{req.status}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
}

export default JobSeekerRequestsPage;

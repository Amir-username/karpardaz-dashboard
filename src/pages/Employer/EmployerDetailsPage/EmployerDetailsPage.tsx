import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { fetchEmployerDetail } from "@/fetch/employer/fetchEmployerDetail";
import type { EmployerDetail } from "@/models/EmployerDetail";
import { useState } from "react";

function EmployerDetailsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [employerDetail, setEmployerDetail] = useState<EmployerDetail>();

  const handleSearchDetails = () => {
    const fetchDetails = async () => {
      const data = await fetchEmployerDetail(Number(searchInput));
      setEmployerDetail(data);
    };

    fetchDetails();
    setSearchInput("");
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست جزئیات کارفرما</h1>
      <div className="flex gap-1 w-96">
        <Button onClick={handleSearchDetails}>جستجو</Button>
        <Input
          type="numbers"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="شناسه کارفرما"
        />
      </div>
      {employerDetail && (
        <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
          <Table className="p-2">
            <TableRow className="flex w-full font-bold p-2">
              <TableCell className="w-64">شناسه</TableCell>
              <TableCell className="w-64">نام سازمان</TableCell>
              <TableCell className="w-64">وبسایت</TableCell>
              <TableCell className="w-64">جمعیت</TableCell>
            </TableRow>
            <TableRow className="flex w-full p-2">
              <TableCell className="w-64">{employerDetail.id}</TableCell>
              <TableCell className="w-64">
                {employerDetail.company_name}
              </TableCell>
              <TableCell className="w-64">{employerDetail.website}</TableCell>
              <TableCell className="w-64">
                {employerDetail.population}
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </div>
  );
}

export default EmployerDetailsPage;

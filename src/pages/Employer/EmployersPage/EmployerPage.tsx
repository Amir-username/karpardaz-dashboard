import {
  Table,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { BASE_LINK } from "@/config";
import type { EmployerModel } from "@/models/Employer";
import { useEffect, useState } from "react";

function EmployerPage() {
  const [employers, setEmplyoers] = useState<EmployerModel[]>([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      const res = await fetch(BASE_LINK + "employers");
      const data = await res.json();
      console.log(data.employers);
      setEmplyoers(data.employers);
    };

    fetchEmployers();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full m-32 rounded-lg shadow-sm ring-1 ring-gray-200">
      <Table className="p-2">
        <TableRow className="flex w-full font-bold p-2">
          <TableCell className="w-64">شناسه</TableCell>
          <TableCell className="w-64">نام سازمان</TableCell>
          <TableCell className="w-64">ایمیل</TableCell>
        </TableRow>
        {employers.map((employer) => (
          <TableRow className="flex w-full p-2" key={employer.id}>
            <TableCell className="w-64">{employer.id}</TableCell>
            <TableCell className="w-64">{employer.company_name}</TableCell>
            <TableCell className="w-64">{employer.email}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

export default EmployerPage;

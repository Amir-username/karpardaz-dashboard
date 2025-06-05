import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { BASE_LINK } from "@/config";
// import type { EmployerModel } from "@/models/Employer";
// import { useEffect, useState } from "react";

function EmployerPage() {
//   const [employers, setEmplyoers] = useState<EmployerModel[]>([]);

//   useEffect(() => {
//     const fetchEmployers = async () => {
//         const res = await fetch(BASE_LINK + 'employers')
//         const data = await res.json()

//         console.log(data);
//     }

//     fetchEmployers()
//   }, []);
  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-2 m-32 rounded-lg shadow-sm ring-1 ring-gray-200">
      <Table className="p-2 shadow-sm">
        <TableCaption>لیست کارفرما</TableCaption>
        <TableHeader>
          <TableRow className="flex items-center gap-64 pt-4">
            <TableHead>شناسه</TableHead>
            <TableHead>آدرس ایمیل</TableHead>
            <TableHead>نام سازمان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="flex items-center py-2 gap-72">
            <TableCell>1</TableCell>
            <TableCell>امیر</TableCell>
            <TableCell>Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployerPage;

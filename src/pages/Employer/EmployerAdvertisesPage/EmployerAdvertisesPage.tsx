import { Table, TableCell, TableRow } from "@/components/ui/table";
import { fetchAdvertisements } from "@/fetch/employerAdvertise/fetchAdvertisements";
import type { AdvertiseModel } from "@/models/Advertise";
import { useEffect, useState } from "react";

function EmployerAdvertisesPage() {
  const [advertises, setAdvertises] = useState<AdvertiseModel[]>([]);

  useEffect(() => {
    const fetchAdvertises = async () => {
      const adsData = await fetchAdvertisements();
      setAdvertises(adsData.advertises);
    };

    fetchAdvertises();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full m-32 ">
      <h1 className="text-2xl">لیست آگهی کارفرما</h1>
      <div className="rounded-lg shadow-sm ring-1 ring-gray-200">
        <Table className="p-2">
          <TableRow className="flex w-full font-bold p-2">
            <TableCell className="w-64">شناسه</TableCell>
            <TableCell className="w-64">عنوان</TableCell>
            <TableCell className="w-64">شهر</TableCell>
            <TableCell className="w-64">گروه شغلی</TableCell>
          </TableRow>
          {advertises.map((advertise) => (
            <TableRow className="flex w-full p-2" key={advertise.id}>
              <TableCell className="w-64">{advertise.id}</TableCell>
              <TableCell className="w-64">{advertise.title}</TableCell>
              <TableCell className="w-64">{advertise.city}</TableCell>
              <TableCell className="w-64">{advertise.job_group}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default EmployerAdvertisesPage;

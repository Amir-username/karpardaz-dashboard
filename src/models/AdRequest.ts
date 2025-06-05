export type AdRequestModel = {
  id: number;
  advertise_id?: number;
  jobseeker_id?: number;
  status:
    | "در صف بررسی"
    | "توسط کارفرما دیده شد"
    | "تایید اولیه"
    | "تایید برای مصاحبه"
    | "رد شده";
};

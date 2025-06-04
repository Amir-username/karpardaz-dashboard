import { PanelItem } from "../Employer/EmployerPanel";

function JobSeekerPanel() {
  return (
    <ul className="flex flex-wrap gap-4 w-full h-full my-48 items-center justify-center px-8">
      <PanelItem link="/jobseekers" title="لیست کارجو" icon="person" />
      <PanelItem
        link="/jobseeker-details"
        title="جزئیات کارجو"
        icon="demography"
      />
      <PanelItem
        link="/jobseeker-advertises"
        title="آگهی کارجو"
        icon="campaign"
      />
      <PanelItem
        link="/jobseeker-requests"
        title="درخواست کارجو"
        icon="work_history"
      />
    </ul>
  );
}

export default JobSeekerPanel;

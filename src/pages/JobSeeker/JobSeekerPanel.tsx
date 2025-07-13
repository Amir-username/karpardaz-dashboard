import PanelCard from "@/components/app/PanelCard/PanelCard";
import PanelCardItem from "@/components/app/PanelCard/PanelCardItem";

function JobSeekerPanel() {
  return (
    <PanelCard>
      <PanelCardItem
        link="/jobseekers"
        title="لیست کارجو"
        icon="person"
      />
      <PanelCardItem
        link="/jobseeker-details"
        title="جزئیات کارجو"
        icon="demography"
      />
      <PanelCardItem
        link="/jobseeker-advertises"
        title="آگهی کارجو"
        icon="campaign"
      />
      <PanelCardItem
        link="/jobseeker-requests"
        title="درخواست کارجو"
        icon="work_history"
      />
    </PanelCard>
  );
}

export default JobSeekerPanel;

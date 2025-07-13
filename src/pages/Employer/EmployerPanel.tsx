import PanelCard from "@/components/app/PanelCard/PanelCard";
import PanelCardItem from "@/components/app/PanelCard/PanelCardItem";

function EmployerPanel() {
  return (
    <PanelCard>
      <PanelCardItem
        link="/employers" title="لیست کارفرما" icon="groups"
      />
      <PanelCardItem
        link="/employer-details"
        title="جزئیات کارفرما"
        icon="demography"
      />
      <PanelCardItem
        link="/employer-advertises"
        title="آگهی کارفرما"
        icon="campaign"
      />
      <PanelCardItem
        link="/employer-requests"
        title="درخواست کارفرما"
        icon="work_history"
      />
    </PanelCard>
  );
}

export default EmployerPanel;
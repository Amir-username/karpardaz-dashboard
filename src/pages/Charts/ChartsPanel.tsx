import PanelCard from "@/components/app/PanelCard/PanelCard";
import PanelCardItem from "@/components/app/PanelCard/PanelCardItem";

function ChartsPanel() {
  return (
    <PanelCard>
      <PanelCardItem
        link="/charts/ad-salary"
        title="نمودار دستمزد"
        icon="payment"
      />
      <PanelCardItem
        link="/charts/position"
        title="نمودار موقعیت شغلی"
        icon="engineering"
      />
      <PanelCardItem
        link="/charts/users"
        title="نمودار تفکیک نقش"
        icon="business_center"
      />
      <PanelCardItem
        link="/charts/gender"
        title="نمودار تفکیک جنسیت"
        icon="wc"
      />
    </PanelCard>
  );
}

export default ChartsPanel;

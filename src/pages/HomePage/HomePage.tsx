import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import PanelCard from "@/components/app/PanelCard/PanelCard";
import PanelCardItem from "@/components/app/PanelCard/PanelCardItem";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("dashboard_token");

    if (token === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <PanelCard>
      <PanelCardItem title="نمودار ها" icon="bar_chart" link="/charts" />
      <PanelCardItem title="کارفرما" icon="groups" link="/employer-panel" />
      <PanelCardItem title="کارجو" icon="person" link="/jobseeker-panel" />
    </PanelCard>
  );
}

export default HomePage;

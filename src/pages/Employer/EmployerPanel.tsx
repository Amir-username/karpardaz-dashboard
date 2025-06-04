import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";

function EmployerPanel() {
  return (
    <ul className="flex flex-wrap gap-4 w-full h-full my-48 items-center justify-center px-8">
      <PanelItem link="/employers" title="لیست کارفرما" icon="groups" />
      <PanelItem
        link="/employer-details"
        title="جزئیات کارفرما"
        icon="demography"
      />
      <PanelItem
        link="/employer-advertises"
        title="آگهی کارفرما"
        icon="campaign"
      />
      <PanelItem
        link="/employer-requests"
        title="درخواست کارفرما"
        icon="work_history"
      />
    </ul>
  );
}

export default EmployerPanel;

type PanelItemProps = {
  title: string;
  icon: string;
  link: string;
};

export function PanelItem({ title, icon, link }: PanelItemProps) {
  return (
    <li>
      <Link to={link}>
        <Card className="cursor-pointer hover:shadow-md duration-500">
          <CardContent>
            <span
              style={{
                fontSize: "8rem",
              }}
              className="material-symbols-outlined text-muted-foreground"
            >
              {icon}
            </span>
          </CardContent>
          <CardHeader className="flex justify-center text-lg font-bold text-secondary-foreground">
            {title}
          </CardHeader>
        </Card>
      </Link>
    </li>
  );
}

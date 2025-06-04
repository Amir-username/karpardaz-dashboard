import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";

function EmployerPanel() {
  return (
    <ul className="flex flex-wrap gap-4 w-full h-full my-48 items-center justify-center px-8">
      <EmployerPanelItem link="/employers" title="لیست کارفرما" icon="groups" />
      <EmployerPanelItem
        link="/employer-details"
        title="جزئیات کارفرما"
        icon="demography"
      />
      <EmployerPanelItem
        link="/employer-advertises"
        title="آگهی کارفرما"
        icon="campaign"
      />
      <EmployerPanelItem
        link="/employer-requests"
        title="درخواست کارفرما"
        icon="work_history"
      />
    </ul>
  );
}

export default EmployerPanel;

type EmployerPanelItemProps = {
  title: string;
  icon: string;
  link: string;
};

function EmployerPanelItem({ title, icon, link }: EmployerPanelItemProps) {
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

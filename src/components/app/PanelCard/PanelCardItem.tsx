import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";

type PanelCardItemProps = {
  title: string;
  link: string;
  icon: string;
};

export default function PanelCardItem({
  title,
  link,
  icon,
}: PanelCardItemProps) {
  return (
    <Link to={link}>
      <Card className="cursor-pointer hover:shadow-md duration-500 min-w-[14rem]">
        <CardContent>
          <div className="flex items-center justify-center rounded-full p-4">
            <span
              style={{
                fontSize: "6rem",
              }}
              className="material-symbols-outlined text-primary"
            >
              {icon}
            </span>
          </div>
        </CardContent>
        <CardHeader className="flex justify-center text-lg  font-bold text-foreground">
          {title}
        </CardHeader>
      </Card>
    </Link>
  );
}

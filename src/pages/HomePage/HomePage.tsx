import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("dashboard_token");

    if (token === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="flex-2/3 justify-center items-center flex h-full">
      <div className="flex items-center justify-center gap-8 py-48">
        <Link to={"/charts-panel"}>
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <div className="ring-4 ring-primary rounded-full px-3 py-2">
                <span
                  style={{
                    fontSize: "4.5rem",
                  }}
                  className="material-symbols-outlined text-primary"
                >
                  bar_chart
                </span>
              </div>
            </CardContent>
            <CardHeader className="flex justify-center text-xl font-bold text-foreground">
              نمودار ها
            </CardHeader>
          </Card>
        </Link>
        <Link to={"/employer-panel"}>
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <div className="ring-4 ring-primary rounded-full px-3 py-2">
                <span
                  style={{
                    fontSize: "4.5rem",
                  }}
                  className="material-symbols-outlined text-primary"
                >
                  groups
                </span>
              </div>
            </CardContent>
            <CardHeader className="flex justify-center text-xl font-bold text-foreground">
              کارفرما
            </CardHeader>
          </Card>
        </Link>
        <Link to={"/jobseeker-panel"}>
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <div className="ring-4 ring-primary rounded-full px-3 py-2">
                <span
                  style={{
                    fontSize: "4.5rem",
                  }}
                  className="material-symbols-outlined text-primary"
                >
                  person
                </span>
              </div>
            </CardContent>
            <CardHeader className="flex justify-center text-xl font-bold text-foreground">
              کارجو
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}

export default HomePage;

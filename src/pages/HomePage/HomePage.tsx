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
        <Link to={"/employer-panel"}>
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <span
                style={{
                  fontSize: "8rem",
                }}
                className="material-symbols-outlined text-muted-foreground"
              >
                groups
              </span>
            </CardContent>
            <CardHeader className="flex justify-center text-2xl font-bold text-secondary-foreground">
              کارفرما
            </CardHeader>
          </Card>
        </Link>
        <Link to={"/jobseeker-panel"}>
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <span
                style={{
                  fontSize: "8rem",
                }}
                className="material-symbols-outlined text-muted-foreground"
              >
                person
              </span>
            </CardContent>
            <CardHeader className="flex justify-center text-2xl font-bold text-secondary-foreground">
              کارجو
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}

export default HomePage;

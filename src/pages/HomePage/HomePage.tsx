import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import SideBar from "@/components/app/Sidebar/Sidebar";
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
    <div className="flex">
      <SideBar />
      <main className="flex-2/3 justify-center items-center flex">
        <div className="flex items-center justify-center gap-8">
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <span
                style={{
                  fontSize: "12rem",
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
          <Card className="cursor-pointer hover:shadow-md duration-500">
            <CardContent>
              <span
                style={{
                  fontSize: "12rem",
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
        </div>
      </main>
    </div>
  );
}

export default HomePage;

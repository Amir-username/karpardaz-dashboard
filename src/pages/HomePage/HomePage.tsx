import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { Sidebar } from "lucide-react";
import SideBar from "@/components/app/Sidebar/Sidebar";

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
        home page
      </main>
    </div>
  );
}

export default HomePage;

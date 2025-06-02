import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("dashboard_token");

    if (token === undefined) {
      navigate("/login");
    }
  }, []);

  return <main>Home</main>;
}

export default HomePage;

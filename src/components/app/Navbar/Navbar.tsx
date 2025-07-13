import { Link } from "react-router";
import Theme from "./Theme";

function NavBar() {
  return (
    <nav className="flex justify-between h-16 shadow-sm shadow-gray-50 dark:shadow-primary-foreground px-8 py-4">
      <Link to={"/"}>
        <h1 className="text-2xl font-semibold text-primary">
          پنل مدیریت کارپرداز
        </h1>
      </Link>
      <Theme />
    </nav>
  );
}

export default NavBar;

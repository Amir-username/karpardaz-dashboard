import { Link } from "react-router";

function NavBar() {
  return (
    <nav className="flex justify-between h-16 shadow-sm shadow-gray-50 px-8 py-4">
      <Link to={"/"}>
        <h1 className="text-2xl font-semibold text-primary">
          پنل مدیریت کارپرداز
        </h1>
      </Link>
    </nav>
  );
}

export default NavBar;

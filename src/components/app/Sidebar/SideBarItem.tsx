import { Link } from "react-router";

type SideBarItemProps = {
  text: string;
  link: string;
};

function SideBarItem({ text, link }: SideBarItemProps) {
  return (
    <Link to={link}>
      <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
        {text}
      </li>
    </Link>
  );
}

export default SideBarItem;

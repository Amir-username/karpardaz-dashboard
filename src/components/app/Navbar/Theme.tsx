import { useEffect, useState } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      return false;
    } else {
      return true;
    }
  });

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDark) {
      html?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html?.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <span
      onClick={() => setIsDark((d) => !d)}
      className="material-symbols-outlined text-primary cursor-pointer"
    >
      {isDark ? "light_mode" : "dark_mode"}
    </span>
  );
}

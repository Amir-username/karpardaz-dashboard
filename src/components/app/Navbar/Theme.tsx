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

  const handleToggle = () => setIsDark((d) => !d);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="material-symbols-outlined text-primary cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? "light_mode" : "dark_mode"}
    </span>
  );
}

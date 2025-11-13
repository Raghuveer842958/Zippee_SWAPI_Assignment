import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
// import { useTheme } from "./TheamProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggle}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/AuthContext";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="w-full border-b bg-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <span className="font-bold text-2xl text-black dark:text-white">
          Star Wars
        </span>

        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user && (
            <Button onClick={logout} variant="destructive" size="sm">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

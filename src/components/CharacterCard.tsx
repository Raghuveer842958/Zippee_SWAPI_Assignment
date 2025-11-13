import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
  name: string;
  gender?: string;
  birthYear: string;
  onClick: () => void;
}

const genderColors: Record<string, string> = {
  male: "from-blue-400 to-blue-600",
  female: "from-pink-400 to-pink-600",
  unknown: "from-gray-400 to-gray-500",
  "n/a": "from-gray-400 to-gray-500",
};

const getBackgroundGradient = (gender?: string): string => {
  if (!gender) return genderColors["unknown"];
  return genderColors[gender.toLowerCase()] || genderColors["unknown"];
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  gender,
  birthYear,
  onClick,
}) => {
  const gradient = getBackgroundGradient(gender);
  const randomImageUrl = `https://picsum.photos/seed/${encodeURIComponent(
    name
  )}/200/200`;

  return (
    <Card
      className="flex flex-col cursor-pointer transition-shadow hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div
        className={cn(
          "relative rounded-t-lg h-48 bg-gradient-to-br",
          gradient,
          "flex items-center justify-center overflow-hidden"
        )}
      >
        <img
          src={randomImageUrl}
          alt={`${name} portrait`}
          className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
        />
      </div>
      <CardContent>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-600">
          Gender:{" "}
          {gender
            ? gender.charAt(0).toUpperCase() + gender.slice(1)
            : "Unknown"}{" "}
          <br />
          Birth Year: {birthYear}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
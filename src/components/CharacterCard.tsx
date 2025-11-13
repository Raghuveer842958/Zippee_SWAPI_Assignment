import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
  name: string;
  species: string[];
  onClick: () => void;
}

const speciesColors: Record<string, string> = {
  Human: "from-blue-400 to-blue-600",
  Droid: "from-yellow-300 to-yellow-500",
  Wookiee: "from-red-500 to-red-700",
  // add more species-color gradients here
};

const getBackgroundGradient = (speciesList: string[]) => {
  for (const species of speciesList) {
    if (speciesColors[species]) {
      return speciesColors[species];
    }
  }
  return "from-gray-300 to-gray-400";
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  species,
  onClick,
}) => {
  const gradient = getBackgroundGradient(species);
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
          {species.join(", ") || "Unknown species"}
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

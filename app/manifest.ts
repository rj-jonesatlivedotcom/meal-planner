import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Family Meal Planner",
    short_name: "Meal Planner",
    description: "Plan meals, check recipes and create your weekly shopping list.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#58735d",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipe-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://renalplan.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
    },
    {
      url: `${baseUrl}/recipes`,
    },
    {
      url: `${baseUrl}/planner`,
    },
    {
      url: `${baseUrl}/nutrition`,
    },
    {
      url: `${baseUrl}/requirements`,
    },
    {
      url: `${baseUrl}/shopping`,
    },
    {
      url: `${baseUrl}/about`,
    },
  ];

  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.id}`,
  }));

  return [...staticPages, ...recipePages];
}





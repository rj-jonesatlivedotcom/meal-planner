import { getRecipeProteinType } from "../../lib/recipeProtein";
import { browseRecipes } from "./index";
import type { Recipe } from "./types";

const breakfastOpening = ["B047", "B048", "B061"];

const closeFamilies = [
  ["B001", "B003", "B004", "B005", "B021", "B033"],
  ["B014", "B023", "B039"],
  ["B017", "B026", "B029", "B037", "B038"],
  ["B006", "B010", "B027", "B040"],
  ["B015", "B018", "B030", "B032", "B034", "B052"],
  ["B041", "B042", "B043", "B044"],
  ["L001", "L002", "L003", "L004", "L005", "L006", "L008"],
  ["L009", "L010", "L011", "L012"],
  ["L013", "L014", "L018"],
  ["L020", "L021", "L022", "L044"],
  ["L025", "L026", "L027"],
  ["D004", "D005", "D006", "D033"],
  ["D014", "D021"],
  ["D025", "D030"],
  ["D027", "D036"],
  ["D106", "D109"],
];

const familyByCode = new Map(closeFamilies.flatMap((codes, family) => codes.map((code) => [code, family] as const)));
const formatAliases: Record<string, string> = {
  "french-toast": "toast",
  "hot-pasta": "pasta",
  "pasta-salad": "pasta",
  "rice-bowl": "rice",
  "rice-dish": "rice",
  "couscous-bowl": "couscous",
  "couscous-dish": "couscous",
  "couscous-salad": "couscous",
};

function browseCard(recipe: Recipe) {
  return {
    recipe,
    family: familyByCode.get(recipe.code),
    format: recipe.code === "B052" ? "pancakes" : formatAliases[recipe.mealFamily] ?? recipe.mealFamily,
    protein: getRecipeProteinType(recipe),
  };
}

type BrowseCard = ReturnType<typeof browseCard>;

function pickNextCard(remaining: BrowseCard[], ordered: BrowseCard[]) {
  const recent = ordered.slice(-5);
  const previous = recent[recent.length - 1];
  const recentFormats = new Set(recent.slice(-2).map((card) => card.format));
  const recentFamilies = new Set(recent.map((card) => card.family));
  const nearestFamilies = new Set(recent.slice(-2).map((card) => card.family));
  const sharesFamily = (card: BrowseCard, families: Set<number | undefined>) =>
    card.family !== undefined && families.has(card.family);
  const separatesFamily = (card: BrowseCard) => !sharesFamily(card, recentFamilies);
  const separatesFormat = (card: BrowseCard) => !recentFormats.has(card.format);
  const separatesProtein = (card: BrowseCard) => card.protein === "Vegetarian" || card.protein !== previous?.protein;

  // Keep catalogue order within each preference, then relax spacing as the section runs out.
  const preferences = [
    (card: BrowseCard) => separatesFamily(card) && separatesFormat(card) && separatesProtein(card),
    (card: BrowseCard) => separatesFamily(card) && separatesFormat(card),
    (card: BrowseCard) => separatesFamily(card) && card.format !== previous?.format,
    separatesFamily,
    (card: BrowseCard) => !sharesFamily(card, nearestFamilies),
  ];
  for (const accepts of preferences) {
    const index = remaining.findIndex(accepts);
    if (index >= 0) return index;
  }
  return 0;
}

function orderDefaultBrowse(recipes: Recipe[]) {
  const sections = new Map<string, BrowseCard[]>();
  for (const recipe of recipes) {
    const card = browseCard(recipe);
    const section = sections.get(recipe.category);
    if (section) section.push(card);
    else sections.set(recipe.category, [card]);
  }

  return Array.from(sections, ([category, remaining]) => {
    const ordered: BrowseCard[] = [];
    if (category === "Breakfast") {
      for (const code of breakfastOpening) {
        const index = remaining.findIndex((card) => card.recipe.code === code);
        if (index >= 0) ordered.push(...remaining.splice(index, 1));
      }
    }
    while (remaining.length) ordered.push(...remaining.splice(pickNextCard(remaining, ordered), 1));
    return ordered.map((card) => card.recipe);
  }).flat();
}

export const defaultBrowseRecipes = orderDefaultBrowse(browseRecipes);

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const recipesDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "recipes"
  );

  const files = fs
    .readdirSync(recipesDirectory)
    .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  const images = files.map((file) => `/images/recipes/${file}`);

  return NextResponse.json(images);
}
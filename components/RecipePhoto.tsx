"use client";

import Image from "next/image";
import { useState } from "react";
import { AllergyOverlay } from "./RecipeAllergy";

export default function RecipePhoto({ src, name, recipeId, priority = false, loading, sizes }: {
  src: string; name: string; recipeId: string; priority?: boolean; loading?: "eager" | "lazy"; sizes?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src?.trim() || failedSrc === src) {
    return (
      <div role="img" aria-label={`${name}: photograph unavailable`} className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-100 text-stone-500 dark:bg-slate-800 dark:text-slate-300">
        <span aria-hidden="true" className="text-4xl">🍽</span>
        <span className="text-xs font-medium">From the RenalPlan kitchen</span>
        <AllergyOverlay recipeId={recipeId} />
      </div>
    );
  }
  // Recipe photos are already compressed WebPs; serve them directly without paid transformations.
  return <><Image src={src} alt={name} fill unoptimized priority={priority} loading={loading}
    sizes={sizes ?? (priority
      ? "(min-width: 1280px) 654px, (min-width: 1024px) calc(52.83vw - 22px), calc(100vw - 42px)"
      : "(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(50vw - 35px), (max-width: 1447px) calc(33.33vw - 31px), 452px")}
    className="object-cover" onError={() => setFailedSrc(src)} /><AllergyOverlay recipeId={recipeId} /></>;
}

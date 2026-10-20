"use client";

import Image from "next/image";
import { useState } from "react";

export default function RecipePhoto({ src, name, priority = false }: {
  src: string; name: string; priority?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src?.trim() || failedSrc === src) {
    return (
      <div role="img" aria-label={`${name}: photograph unavailable`} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-100 text-stone-500 dark:bg-slate-800 dark:text-slate-300">
        <span aria-hidden="true" className="text-4xl">🍽</span>
        <span className="text-xs font-medium">From the RenalPlan kitchen</span>
      </div>
    );
  }
  return <Image src={src} alt={name} fill priority={priority}
    sizes={priority ? "(min-width: 1152px) 560px, (min-width: 1024px) 50vw, 100vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 460px"}
    className="object-cover" onError={() => setFailedSrc(src)} />;
}

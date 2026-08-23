import React from "react";

type PageHeaderProps = {
  icon: string;
  title: string;
  subtitle: string;
  colour?: "orange" | "green" | "blue";
};

export default function PageHeader({
  icon,
  title,
  subtitle,
  colour = "orange",
}: PageHeaderProps) {
  const colourStyles = {
    orange: {
      splashOne: "bg-orange-100/70",
      splashTwo: "bg-amber-100/60",
      icon: "bg-orange-100",
    },
    green: {
      splashOne: "bg-green-100/70",
      splashTwo: "bg-emerald-100/60",
      icon: "bg-green-100",
    },
    blue: {
      splashOne: "bg-blue-100/70",
      splashTwo: "bg-sky-100/60",
      icon: "bg-blue-100",
    },
  };

  const styles = colourStyles[colour];

  return (
    <section className="relative mb-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div
        className={`absolute -right-16 -top-20 h-40 w-40 rounded-full ${styles.splashOne} md:h-48 md:w-48`}
      />

      <div
        className={`absolute -bottom-20 -left-10 h-32 w-32 rounded-full ${styles.splashTwo} md:h-40 md:w-40`}
      />

      <div className="relative px-5 py-5 md:px-8 md:py-5">
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon} text-xl shadow-sm md:h-12 md:w-12 md:rounded-2xl md:text-2xl`}
          >
            {icon}
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {title}
            </h1>

            <p className="mt-1 max-w-xl text-sm leading-5 text-slate-600 md:text-base md:leading-6">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
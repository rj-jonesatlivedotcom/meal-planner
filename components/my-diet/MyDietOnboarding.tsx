"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./MyDietOnboarding.module.css";
import { type Requirements, monitoredNutrients, nutrientLabels, isNutrientActive, targetNutrients, activeRequirements } from "@/lib/myDiet";
import { kidneyStages, kidneyStageChoice, withKidneyStage, nutrientReference, acceptNutrientReference } from "@/lib/myDietReferences";
import { createOnboardingDraft, onboardingSteps, nutrientExplanations, onboardingTargets, targetDisplayValue,
  withTarget, targetSource, targetSummary, validateOnboardingTargets, saveOnboardingAction, onboardingSaveError,
  sidneyGuidance, type OnboardingAction } from "@/lib/myDietOnboarding";

type Props = {
  initialRequirements: Requirements;
  initialStep?: number;
  onDraftChange: (draft: Requirements) => void;
  onSave: (next: Requirements, pendingDraft?: Requirements) => Promise<void>;
  onExit: () => void;
};
const fieldClass = `${styles.field} mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-[#067b3a] focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100`;
const primaryClass = `${styles.primary} min-h-11 rounded-xl bg-[#067b3a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#056b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#067b3a] disabled:opacity-60`;
const secondaryClass = `${styles.secondary} min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-[#12396b] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12396b] disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100`;

const poses = ["hello", "point", "explain", "encourage", "celebrate"];
const poseDescriptions = ["waving hello", "pointing to your choices", "explaining your choices", "encouraging you", "celebrating"];
const nutrientIcons = { sodium: "🧂", protein: "🥚", potassium: "🍌", phosphate: "🧀", calories: "🔥", carbohydrate: "🍞", fluid: "💧" };

export default function MyDietOnboarding({ initialRequirements, initialStep, onDraftChange, onSave, onExit }: Props) {
  const [draft, setDraft] = useState<Requirements>(() => {
    const initial = createOnboardingDraft(initialRequirements);
    return { ...initial, onboardingStep: typeof initialStep === "number" && Number.isInteger(initialStep) && initialStep >= 1 && initialStep <= 4 ? initialStep : initial.onboardingStep };
  });
  const step = draft.onboardingStep ?? 1;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAction, setFailedAction] = useState<OnboardingAction | null>(null);
  const [tour, setTour] = useState(false);
  const [preview, setPreview] = useState(false);
  const leavingRef = useRef(false);
  const savingRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => { headingRef.current?.focus(); }, [step, tour]);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  function edit(next: Requirements) {
    const current = { ...next, onboardingStep: step, onboardingVersion: 2, onboardingStatus: "in_progress" as const };
    setDraft(current); onDraftChange(current);
  }

  function navigateTo(nextStep: number) {
    const current = { ...draft, onboardingStep: nextStep, onboardingStatus: "in_progress" as const };
    setDraft(current); onDraftChange(current);
  }

  function leave(skip = false) {
    if (leavingRef.current) return;
    leavingRef.current = true;
    onDraftChange({ ...draft, onboardingStatus: skip ? "skipped" : "in_progress" });
    if (skip && !preview) void saveOnboardingAction(draft, step, "skip", next => onSave(next, draft)).catch(() => {});
    onExit();
  }

  async function accept(action: OnboardingAction) {
    if (savingRef.current) return;
    if (preview) {
      setError(null); setFailedAction(null);
      if (action === "continue") navigateTo(Math.min(4, step + 1));
      else setTour(true);
      return;
    }
    const validation = step === 4 ? validateOnboardingTargets(activeRequirements(draft)) : null;
    if (validation) { setError(validation); setFailedAction(null); return; }
    savingRef.current = true; setBusy(true); setError(null); setFailedAction(null);
    onDraftChange(draft);
    try {
      const saved = await saveOnboardingAction(draft, step, action, next => onSave(next, draft));
      if (leavingRef.current) return;
      setDraft(saved);
      if (action === "complete") setTour(true);
    } catch (cause) {
      if (!leavingRef.current) { setError(onboardingSaveError(cause)); setFailedAction(action); }
    } finally {
      savingRef.current = false;
      if (!leavingRef.current) setBusy(false);
    }
  }

  const selectedNutrients = monitoredNutrients.filter(nutrient => isNutrientActive(draft, nutrient));
  const stageLabel = kidneyStages.find(choice => choice.value === kidneyStageChoice(draft))!.label;
  const pose = tour ? 4 : step - 1;

  return (
    <section aria-labelledby={id + "-heading"} className={styles.journey}>
      <p className={styles.journeyTitle}>Your RenalPlan Journey</p>
      <div className={styles.layout}>
        <div className={styles.character}>
          <Image src={"/images/henle-" + poses[pose] + ".png"} alt={"Sidney the Kidney " + poseDescriptions[pose]}
            width={1323} height={1189} sizes="(max-width: 767px) 160px, 430px" priority className={styles.mascot} />
        </div>
        <div className={styles.card}>
          {!tour && <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Step {step} of 4</p>
            <ol aria-label="Setup progress" className="flex gap-1.5">
              {onboardingSteps.map((title, index) => <li key={title} aria-current={step === index + 1 ? "step" : undefined} title={title}
                className={"h-2 w-7 rounded-full sm:w-9 " + (index < step ? "bg-[#067b3a]" : "bg-slate-200 dark:bg-slate-700")}>
                <span className="sr-only">{index + 1}. {title}</span>
              </li>)}
            </ol>
          </div>}
          <h1 ref={headingRef} id={id + "-heading"} tabIndex={-1} className="text-2xl font-extrabold tracking-tight text-[#12396b] outline-none sm:text-3xl dark:text-slate-100">
            {tour ? (preview ? "Keep exploring" : "You're all set!") : sidneyGuidance[step - 1].opening}
          </h1>
          {tour ? <div className="mt-4">
            <p role="status" className="text-base leading-6 text-slate-600 dark:text-slate-300">{preview ? "Unsaved preview — setup is not complete. Your answers are kept in this browser." : "Ready to find something delicious? Your setup is saved."}</p>
            <nav aria-label="Explore RenalPlan" className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/recipes" className={styles.destination}><span aria-hidden="true">🥗</span>Explore Recipes</Link>
              <Link href="/planner" className={styles.destination}><span aria-hidden="true">🗓️</span>Plan My Week</Link>
            </nav>
            <button type="button" onClick={preview ? () => leave() : onExit} className={secondaryClass + " mt-4"}>
              {preview ? "Return to My Diet" : "Back to My Diet"}
            </button>
          </div> : <form noValidate={preview} onSubmit={event => { event.preventDefault(); void accept(step === 4 ? "complete" : "continue"); }} aria-busy={busy}>
            {(error || preview) && <div ref={errorRef} tabIndex={-1} role="alert" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 outline-none dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
              {preview && <p>Unsaved preview — your answers are kept here, not saved to your account. Setup is not complete.</p>}
              {error && <p>{error}</p>}
              {!preview && failedAction === "continue" && step < 4 && <button type="button" className="mt-2 block min-h-11 text-left font-bold underline" onClick={() => {
                setPreview(true); setError(null); setFailedAction(null); navigateTo(step + 1);
              }}>Continue reviewing without account saving</button>}
              {failedAction && <button type="button" onClick={() => leave()} className="mt-1 block min-h-11 text-left font-bold underline">Return to My Diet with unsaved answers</button>}
            </div>}
            <fieldset disabled={busy} className="mt-3 min-w-0 space-y-3">
              <legend className="sr-only">{onboardingSteps[step - 1]}</legend>
              <p aria-label="A note from Sidney" className={styles.dialogue}>{sidneyGuidance[step - 1].text}</p>
              {step === 1 && <label htmlFor={id + "-name"} className="block text-sm font-bold text-slate-800 dark:text-slate-200">Your preferred name <span className="font-normal">(optional)</span>
                <input id={id + "-name"} autoComplete="given-name" maxLength={120} value={draft.preferredName ?? ""} placeholder="Your preferred name" className={fieldClass}
                  onChange={event => edit({ ...draft, preferredName: event.target.value || null })} />
              </label>}
              {step === 2 && <div className="grid gap-2 sm:grid-cols-2">
                {kidneyStages.map(choice => <label key={choice.value} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold dark:border-slate-600 dark:text-slate-100">
                  <input type="radio" name={id + "-stage"} value={choice.value} checked={kidneyStageChoice(draft) === choice.value} className="h-5 w-5 shrink-0 accent-[#067b3a]"
                    onChange={() => edit(withKidneyStage(draft, choice.value))} />{choice.label}
                </label>)}
              </div>}
              {step === 3 && <div className={styles.nutrientGrid}>
                {monitoredNutrients.map(nutrient => <div key={nutrient} data-nutrient={nutrient} className={styles.tile + (selectedNutrients.includes(nutrient) ? " " + styles.selected : "")}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-bold">
                    <input type="checkbox" value={nutrient} checked={selectedNutrients.includes(nutrient)} className="h-5 w-5 accent-[#067b3a]" onChange={event => edit({ ...draft,
                      monitoredNutrients: monitoredNutrients.filter(value => value === nutrient ? event.target.checked : selectedNutrients.includes(value)) })} />
                    <span aria-hidden="true" className={styles.nutrientIcon}>{nutrientIcons[nutrient]}</span><span className={styles.nutrientName}>{nutrientLabels[nutrient]}</span>
                  </label>
                  <details className={styles.tileHelp}><summary aria-label={"About " + nutrientLabels[nutrient]}>i</summary><p>{nutrientExplanations[nutrient]}</p></details>
                </div>)}
              </div>}
              {step === 4 && <>
                {selectedNutrients.length === 0 && <p className="text-sm">No nutrients selected. Back lets you add one.</p>}
                {selectedNutrients.map(nutrient => {
                  const reference = nutrientReference(draft, nutrient);
                  const source = targetSource(draft, nutrient);
                  const fields = onboardingTargets.filter(({ key }) => targetNutrients[key] === nutrient);
                  return <fieldset key={nutrient} className={styles.group + " py-3"}>
                    <legend className="px-1 text-base font-bold dark:text-slate-100">{nutrientLabels[nutrient]}</legend>
                    {reference ? <>
                      <p className="mb-2 text-sm font-semibold dark:text-slate-100">RenalPlan reference: {reference.label}</p>
                      {(nutrient === "potassium" || nutrient === "phosphate") && <p className="mb-2 text-xs leading-5 text-slate-600 dark:text-slate-300">Only accept this reference if your healthcare professional has advised a restriction.</p>}
                      <div className="mb-2 grid gap-1">
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm dark:text-slate-100"><input type="radio" name={id + "-target-" + nutrient} value="reference" checked={source === "reference"} onChange={() => edit(acceptNutrientReference(draft, nutrient))} />{"Use RenalPlan's reference"}</label>
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm dark:text-slate-100"><input type="radio" name={id + "-target-" + nutrient} value="personal" checked={source === "personal"} onChange={() => edit({ ...draft, nutrientTargetSettings: { ...draft.nutrientTargetSettings, sources: { ...draft.nutrientTargetSettings?.sources, [nutrient]: "personal" } } })} />Enter my own target</label>
                      </div>
                    </> : <p className="mb-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{draft.ckdStage === "custom" ? "No CKD reference is applied." : "RenalPlan has no fixed daily reference for this nutrient."} Enter your own target if you have one, or leave it blank.</p>}
                    {source === "personal" ? <div className="grid gap-3 sm:grid-cols-2">
                      {fields.map(({ key, label, unit }) => <label key={key} htmlFor={id + "-" + key} className="block text-sm font-semibold dark:text-slate-100">{label} ({unit})
                        <input id={id + "-" + key} type="number" min="0" step="any" inputMode="decimal" value={targetDisplayValue(draft, key)} placeholder="No target entered" className={fieldClass}
                          onChange={event => edit(withTarget(draft, key, event.target.value))} />
                      </label>)}
                    </div> : <p className="text-sm dark:text-slate-100">{targetSummary(draft, nutrient)}</p>}
                  </fieldset>;
                })}
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100">
                  <h2 className="font-bold">Your setup at a glance</h2>
                  <p className="mt-2">{draft.preferredName?.trim() || "Name not provided"} · {stageLabel}</p>
                  <ul className="mt-2 space-y-2">{selectedNutrients.map(nutrient => <li key={nutrient}><strong>{nutrientLabels[nutrient]}</strong>: {targetSummary(draft, nutrient)}</li>)}</ul>
                  <p className="mt-3 text-xs">{preview ? "These answers are unsaved. Setup is not complete." : "Finish to save. You can change these in My Diet at any time."}</p>
                </div>
              </>}
            </fieldset>
            <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" disabled={busy || step === 1} className={secondaryClass} onClick={() => { setError(null); setFailedAction(null); navigateTo(step - 1); }}>Back</button>
                <button type="submit" disabled={busy} className={primaryClass + " ml-auto"}>{busy ? "Saving…" : step === 1 ? "Let's go!" : step === 4 ? (preview ? "Explore without saving" : "Finish setup") : "Continue"}</button>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <button type="button" onClick={() => leave(true)} className="min-h-11 px-1 text-sm font-semibold text-slate-600 underline dark:text-slate-300">Skip for now</button>
                <button type="button" onClick={() => leave()} className="min-h-11 px-1 text-sm font-semibold text-slate-600 underline dark:text-slate-300">Return to My Diet</button>
                <p role="status" className="sr-only">{busy ? "Saving to your account…" : preview ? "Unsaved preview — account saving is off." : ""}</p>
              </div>
            </div>
          </form>}
        </div>
      </div>
    </section>
  );
}

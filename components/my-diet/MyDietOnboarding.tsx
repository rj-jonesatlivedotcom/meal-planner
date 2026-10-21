"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./MyDietOnboarding.module.css";
import {
  type Requirements, monitoredNutrients, nutrientLabels,
  isMonitoringWithoutTarget, monitoringWithoutTargetLabel,
} from "@/lib/myDiet";
import {
  createOnboardingDraft, onboardingSteps, nutrientExplanations, onboardingTargets,
  targetDisplayValue, withTarget, parseFoodList, validateOnboardingTargets,
  saveOnboardingAction, onboardingSaveError, sidneyGuidance, type OnboardingAction,
} from "@/lib/myDietOnboarding";

type Props = {
  initialRequirements: Requirements;
  onDraftChange: (draft: Requirements) => void;
  onSave: (next: Requirements, pendingDraft?: Requirements) => Promise<void>;
  onExit: () => void;
};
const fieldClass = "mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-[#067b3a] focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";
const primaryClass = "min-h-11 rounded-xl bg-[#067b3a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#056b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#067b3a] disabled:opacity-60";
const secondaryClass = "min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-[#12396b] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12396b] disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export default function MyDietOnboarding({ initialRequirements, onDraftChange, onSave, onExit }: Props) {
  const [draft, setDraft] = useState(() => createOnboardingDraft(initialRequirements));
  const [step, setStep] = useState(() => createOnboardingDraft(initialRequirements).onboardingStep ?? 1);
  const [allergyAnswer, setAllergyAnswer] = useState<"unanswered" | "none" | "listed">(
    initialRequirements.foodAllergies == null ? "unanswered" : initialRequirements.foodAllergies.length ? "listed" : "none");
  const [allergyText, setAllergyText] = useState((initialRequirements.foodAllergies ?? []).join(", "));
  const [dislikeText, setDislikeText] = useState((initialRequirements.dislikedFoods ?? []).join(", "));
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
    const current = { ...next, onboardingStep: step, onboardingVersion: 1, onboardingStatus: "in_progress" as const };
    setDraft(current);
    onDraftChange(current);
  }

  function navigateTo(nextStep: number) {
    const current = { ...draft, onboardingStep: nextStep, onboardingStatus: "in_progress" as const };
    setStep(nextStep);
    setDraft(current);
    onDraftChange(current);
  }

  function leave(skip = false) {
    if (leavingRef.current) return;
    leavingRef.current = true;
    // Exiting retains the draft; it never depends on validation or a network response.
    onDraftChange({ ...draft, onboardingStatus: skip ? "skipped" : "in_progress" });
    if (skip && !preview) {
      // Use the same save queue, but an unavailable account must not trap the user.
      void saveOnboardingAction(draft, step, "skip", next => onSave(next, draft)).catch(() => {});
    }
    onExit();
  }

  async function accept(action: OnboardingAction, showTour = false) {
    if (action === "skip") { leave(true); return; }
    if (savingRef.current) return;
    if (preview) {
      setError(null); setFailedAction(null);
      if (action === "continue") navigateTo(Math.min(5, step + 1));
      else if (showTour) setTour(true);
      else leave();
      return;
    }
    const validation = step >= 3 ? validateOnboardingTargets(draft) : null;
    if (validation) { setError(validation); setFailedAction(null); return; }
    if (step === 4 && action === "continue" && allergyAnswer === "listed" && !draft.foodAllergies?.length) {
      setError("Enter an allergy, or choose another allergy answer."); setFailedAction(null); return;
    }
    savingRef.current = true;
    setBusy(true); setError(null); setFailedAction(null);
    // Keep a resumable draft, never an optimistic completed state.
    onDraftChange(draft);
    try {
      const saved = await saveOnboardingAction(draft, step, action, next => onSave(next, draft));
      if (leavingRef.current) return;
      setDraft(saved);
      setStep(saved.onboardingStep ?? step);
      if (action === "complete") {
        if (showTour) setTour(true);
        else onExit();
      }
    } catch (cause) {
      if (!leavingRef.current) { setError(onboardingSaveError(cause)); setFailedAction(action); }
    } finally {
      savingRef.current = false;
      if (!leavingRef.current) setBusy(false);
    }
  }

  const summaryTargets = onboardingTargets.filter(({ key }) => draft[key] != null);
  const preferences = (["potassium", "phosphate", "purines"] as const)
    .filter(key => draft[key] !== "Any");

  return (
    <section aria-labelledby={`${id}-heading`} className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className={styles.layout}>
        <aside className="flex items-center gap-3 border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-4 md:flex-col md:justify-start md:border-b-0 md:border-r md:p-6 dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
          <Image src="/images/kidney-chef.png" alt="Sidney the Kidney, your friendly RenalPlan guide" width={1322} height={1190}
            sizes="(max-width: 767px) 134px, 223px" priority className={styles.mascot} />
          <div className="min-w-0 md:text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#067b3a] dark:text-emerald-300">My Diet, with Sidney</p>
            <p className="mt-2 text-sm leading-6 text-[#355270] dark:text-slate-300">A little about you, at your pace. You can change your answers later.</p>
            <p className="mt-3 hidden text-xs leading-5 text-slate-500 md:block dark:text-slate-400">Your choices support planning alongside advice from your healthcare team.</p>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          {!tour && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Step {step} of 5</p>
              <ol aria-label="Setup progress" className="flex gap-1.5">
                {onboardingSteps.map((title, index) => (
                  <li key={title} aria-current={step === index + 1 ? "step" : undefined} title={title}
                    className={`h-2 w-7 rounded-full sm:w-9 ${index < step ? "bg-[#067b3a]" : "bg-slate-200 dark:bg-slate-700"}`}>
                    <span className="sr-only">{index + 1}. {title}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <h1 ref={headingRef} id={`${id}-heading`} tabIndex={-1} className="text-2xl font-extrabold tracking-tight text-[#12396b] outline-none sm:text-3xl dark:text-slate-100">
            {tour ? "A quick look around" : onboardingSteps[step - 1]}
          </h1>

          {tour ? (
            <div className="mt-4">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{preview ? "You are exploring with unsaved answers. Setup is not complete." : "Your setup is saved."} Here are the places to explore whenever you are ready.</p>
              <nav aria-label="Explore RenalPlan" className="mt-5 grid gap-3 sm:grid-cols-2">
                {[["/", "Dashboard", "Your day and helpful next steps."], ["/recipes", "Recipes", "Browse meals and save your favourites."],
                  ["/planner", "Planner", "Choose meals for your week."], ["/nutrition", "Nutrition", "View your planned nutritional amounts."],
                  ["/shopping", "Shopping list", "See the ingredients for your plan."]].map(([href, title, description]) => (
                  <Link key={href} href={href} className={`${secondaryClass} block`}><span className="block">{title} →</span><span className="mt-1 block text-xs font-normal leading-5">{description}</span></Link>
                ))}
              </nav>
              <button type="button" onClick={() => preview ? leave() : onExit()} className={`${primaryClass} mt-5`}>Go to My Diet</button>
            </div>
          ) : (
            <form noValidate={preview} onSubmit={event => { event.preventDefault(); void accept(step === 5 ? "complete" : "continue"); }} aria-busy={busy}>
              {(error || preview) && (
                <div ref={errorRef} tabIndex={-1} role="alert" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 outline-none dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
                  {preview && <p>Unsaved preview — your answers are kept here, not saved to your account. Setup is not complete.</p>}
                  {error && <p>{error}</p>}
                  {!preview && failedAction === "continue" && step < 5 && (
                    <button type="button" className="mt-2 block min-h-11 text-left font-bold underline" onClick={() => {
                      setPreview(true); setError(null); setFailedAction(null);
                      navigateTo(step + 1);
                    }}>Continue reviewing without account saving</button>
                  )}
                  {failedAction && <button type="button" onClick={() => leave()} className="mt-1 block min-h-11 text-left font-bold underline">Return to My Diet with unsaved answers</button>}
                </div>
              )}

              <fieldset disabled={busy} className="mt-4 min-w-0 space-y-5">
                <legend className="sr-only">{onboardingSteps[step - 1]}</legend>
                <div aria-label="A note from Sidney" className="space-y-2 text-slate-600 dark:text-slate-300">
                  <p className="text-base font-semibold leading-7 text-[#12396b] dark:text-slate-100">{sidneyGuidance[step - 1].opening}</p>
                  <p className="text-sm leading-6">{sidneyGuidance[step - 1].text}</p>
                </div>
                {step === 1 && <>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">We&apos;ll choose what you want to monitor, record advice you already have, and note your food preferences. No targets or restrictions are added automatically.</p>
                  <label htmlFor={`${id}-name`} className="block text-sm font-bold text-slate-800 dark:text-slate-200">What would you like me to call you? <span className="font-normal">(optional)</span>
                    <input id={`${id}-name`} autoComplete="given-name" maxLength={120} value={draft.preferredName ?? ""} placeholder="Your preferred name" className={fieldClass}
                      onChange={event => edit({ ...draft, preferredName: event.target.value || null })} />
                  </label>
                </>}

                {step === 2 && <>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Monitoring does not change your existing targets or restrictions.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {monitoredNutrients.map(nutrient => (
                      <div key={nutrient} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-100">
                          <input type="checkbox" name="monitoredNutrients" value={nutrient} checked={draft.monitoredNutrients?.includes(nutrient) ?? false}
                            className="h-5 w-5 accent-[#067b3a]" onChange={event => edit({ ...draft, monitoredNutrients: event.target.checked
                              ? [...(draft.monitoredNutrients ?? []), nutrient] : (draft.monitoredNutrients ?? []).filter(item => item !== nutrient) })} />
                          {nutrientLabels[nutrient]}
                        </label>
                        <details className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                          <summary title={nutrientExplanations[nutrient]} className="min-h-8 cursor-pointer py-1 font-semibold text-[#1266c3] dark:text-blue-300">About {nutrientLabels[nutrient].toLowerCase()}</summary>
                          <p className="pt-1">{nutrientExplanations[nutrient]}</p>
                        </details>
                      </div>
                    ))}
                  </div>
                </>}

                {step === 3 && <>
                  <label htmlFor={`${id}-advice`} className="block text-sm font-bold text-slate-800 dark:text-slate-200">Advice you have already received <span className="font-normal">(optional)</span>
                    <textarea id={`${id}-advice`} rows={3} value={draft.dietaryAdvice ?? ""} className={fieldClass} placeholder="Anything you would like to keep a note of"
                      onChange={event => edit({ ...draft, dietaryAdvice: event.target.value || null })} />
                  </label>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">If you already have daily numerical targets, you can record them below. Leave a box blank when no target has been entered. Your notes are kept as written and do not automatically set limits.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {onboardingTargets.map(({ key, label, unit }) => (
                      <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{label} <span className="font-normal text-slate-500 dark:text-slate-400">({unit})</span>
                        <input id={`${id}-${key}`} type="number" min="0" step="any" inputMode="decimal" value={targetDisplayValue(draft, key)} placeholder="No target entered" className={fieldClass}
                          onChange={event => edit(withTarget(draft, key, event.target.value))} />
                      </label>
                    ))}
                  </div>
                  <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Salt uses the same grams-to-sodium conversion as My Diet. Energy can be monitored without a numerical target. Your CKD setting is unchanged.</p>
                </>}

                {step === 4 && <>
                  <fieldset className="space-y-2">
                    <legend className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-100">Food allergies <span className="font-normal">(optional)</span></legend>
                    {([['unanswered', "I'll answer this later"], ['none', 'No known food allergies'], ['listed', 'I have food allergies']] as const).map(([value, label]) => (
                      <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        <input type="radio" name={`${id}-allergy-answer`} value={value} checked={allergyAnswer === value} className="h-4 w-4 accent-[#067b3a]" onChange={() => {
                          setAllergyAnswer(value); edit({ ...draft, foodAllergies: value === "none" ? [] : value === "unanswered" ? null : parseFoodList(allergyText).length ? parseFoodList(allergyText) : null });
                        }} />{label}
                      </label>
                    ))}
                  </fieldset>
                  {allergyAnswer === "listed" && <label htmlFor={`${id}-allergies`} className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Your food allergies
                    <textarea id={`${id}-allergies`} rows={2} required value={allergyText} className={fieldClass} placeholder="Separate foods with commas or new lines" onChange={event => {
                      setAllergyText(event.target.value); const foods = parseFoodList(event.target.value); edit({ ...draft, foodAllergies: foods.length ? foods : null });
                    }} />
                  </label>}
                  <p className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-950 dark:bg-amber-950 dark:text-amber-100">Recording allergies does not guarantee that a recipe or ingredient is safe for you. Check ingredients, packaging and cross-contamination information each time.</p>
                  <label htmlFor={`${id}-dislikes`} className="block text-sm font-bold text-slate-800 dark:text-slate-200">Foods you dislike <span className="font-normal">(optional, separate from allergies)</span>
                    <textarea id={`${id}-dislikes`} rows={2} value={dislikeText} className={fieldClass} placeholder="Separate foods with commas or new lines" onChange={event => {
                      setDislikeText(event.target.value); const foods = parseFoodList(event.target.value); edit({ ...draft, dislikedFoods: foods.length ? foods : null });
                    }} />
                  </label>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm font-bold text-[#12396b] dark:text-slate-100">Keep the foods you love in your favourites</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Use the stars on recipes to manage your existing favourites. They stay separate from allergies and dislikes.</p>
                    <a href="/recipes?view=favourites" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block min-h-11 py-2 text-sm font-bold text-[#1266c3] underline dark:text-blue-300">Open my favourites <span className="text-xs font-normal">(new tab)</span></a>
                  </div>
                </>}

                {step === 5 && <>
                  <p className="break-words text-sm leading-6 text-slate-600 dark:text-slate-300">{draft.preferredName?.trim() ? `${draft.preferredName.trim()}, here` : "Here"} is what you have chosen. {preview ? "These answers remain unsaved. You can go Back to change them, return to My Diet, or explore the app." : "Finish below to save your setup, or go Back to change anything."}</p>
                  <dl className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-800">
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Preferred name</dt><dd className="mt-1 break-words text-slate-600 dark:text-slate-300">{draft.preferredName?.trim() || "Not provided"}</dd></div>
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Nutrients to monitor</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">{draft.monitoredNutrients == null ? "Not answered" : !draft.monitoredNutrients.length ? "None selected" : (
                      <ul className="space-y-1">{draft.monitoredNutrients.map(nutrient => <li key={nutrient}>{nutrientLabels[nutrient]}: {isMonitoringWithoutTarget(draft, nutrient) ? monitoringWithoutTargetLabel : "Using your saved target"}</li>)}</ul>
                    )}</dd></div>
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Daily targets</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">{summaryTargets.length ? <ul>{summaryTargets.map(({ key, label, unit }) => <li key={key}>{label}: {targetDisplayValue(draft, key)} {unit}</li>)}</ul> : "No numerical targets entered"}</dd></div>
                    {preferences.length > 0 && <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Existing preferences retained</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">{preferences.map(key => `${key === "phosphate" ? "Phosphorus" : key}: ${draft[key]}`).join("; ")}</dd></div>}
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Dietary advice</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-600 dark:text-slate-300">{draft.dietaryAdvice?.trim() || "Not provided"}</dd></div>
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Allergies reported</dt><dd className="mt-1 break-words text-slate-600 dark:text-slate-300">{draft.foodAllergies == null ? "Not answered" : draft.foodAllergies.length ? draft.foodAllergies.join(", ") : "None reported"}</dd></div>
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Dislikes</dt><dd className="mt-1 break-words text-slate-600 dark:text-slate-300">{draft.dislikedFoods?.length ? draft.dislikedFoods.join(", ") : "Not provided"}</dd></div>
                    <div><dt className="font-bold text-[#12396b] dark:text-slate-100">Favourites</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">Managed in your existing recipe favourites.</dd></div>
                  </dl>
                </>}
              </fieldset>

              <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" disabled={busy || step === 1} className={secondaryClass} onClick={() => { setError(null); setFailedAction(null); navigateTo(step - 1); }}>Back</button>
                  {step < 5 ? <button type="submit" disabled={busy} className={`${primaryClass} ml-auto`}>{busy ? "Saving…" : "Continue"}</button> : <>
                    <button type="submit" disabled={busy} className={`${primaryClass} sm:ml-auto`}>{busy ? "Saving…" : "Go to My Diet"}</button>
                    <button type="button" disabled={busy} className={secondaryClass} onClick={() => void accept("complete", true)}>Show me around</button>
                  </>}
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <button type="button" onClick={() => leave(true)} className="min-h-11 px-1 text-sm font-semibold text-slate-600 underline dark:text-slate-300">Skip for now</button>
                  <button type="button" onClick={() => leave()} className="min-h-11 px-1 text-sm font-semibold text-slate-600 underline dark:text-slate-300">Return to My Diet</button>
                  <p role="status" className="text-xs text-slate-500 dark:text-slate-400">{busy ? "Saving to your account…" : preview ? "Unsaved preview — account saving is off." : "Your choices save when you continue."}</p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

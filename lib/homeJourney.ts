import { visibleMonitoredNutrients, type Requirements } from "./myDiet";
import { getNutrientTarget } from "./nutrientTargets";

/** Homepage guidance only: this never blocks navigation or changes saved settings. */
export function homeJourney(requirements: Requirements | null, plannedMeals: number, pendingSave = false) {
  const selected = requirements ? visibleMonitoredNutrients(requirements) : [];
  const figuresSaved = selected.length > 0 && selected.every(nutrient => {
    const { min, max } = getNutrientTarget(requirements, nutrient === "carbohydrate" ? "carbohydrates" : nutrient);
    const figures = [min, max].filter(value => value != null);
    return figures.length > 0 && figures.every(value => Number.isFinite(value) && value >= 0) &&
      !(min != null && max != null && min > max);
  });
  const wizardComplete = requirements?.onboardingStatus === "completed";
  const dietReady = wizardComplete && figuresSaved && !pendingSave;
  const needsFigures = wizardComplete && !figuresSaved;
  const started = pendingSave || requirements?.onboardingStatus === "in_progress" || requirements?.onboardingStatus === "skipped";

  const nextAction = !dietReady
    ? {
        eyebrow: "YOUR FIRST STEP",
        title: needsFigures ? "Add your daily figures in My Diet." : started ? "Let's finish My Diet." : "Start with My Diet.",
        description: needsFigures
          ? "Your wizard is complete. Save a daily target or range for each nutrient you selected so RenalPlan can compare your nutrition with your figures."
          : "Start with Sidney in My Diet. Complete the guided setup and save your daily figures so RenalPlan can tailor your planning and nutrition reports.",
        href: "/requirements",
        button: needsFigures ? "Set My Diet figures" : started ? "Continue My Diet" : "Set up My Diet",
      }
    : plannedMeals === 0
      ? {
          eyebrow: "YOUR NEXT STEP", title: "Let's plan your week.",
          description: "Your My Diet setup and daily figures are saved. Choose your meals or let MyChef help fill your planner.",
          href: "/planner", button: "Start planning",
        }
      : plannedMeals < 21
        ? {
            eyebrow: "PICK UP WHERE YOU LEFT OFF", title: "Build out your week.",
            description: `${plannedMeals} of 21 meals are planned. Add a few more, or use MyChef for inspiration.`,
            href: "/planner", button: "Continue your plan",
          }
        : {
            eyebrow: "YOUR WEEK IS PLANNED", title: "Your RenalPlan is complete.",
            description: "Your shopping list is ready. Check what you need for the week ahead, and head to the shops when you're ready.",
            href: "/shopping", button: "Open shopping list",
          };

  return {
    dietReady, nextAction,
    currentJourneyStep: !dietReady ? 1 : plannedMeals < 21 ? 2 : 4,
    welcome: dietReady ? "WELCOME BACK" : "WELCOME TO RENALPLAN",
    badge: !dietReady ? needsFigures ? "MY DIET FIGURES TO SET" : "MY DIET TO COMPLETE"
      : plannedMeals === 21 ? "WEEK PLANNED" : plannedMeals > 0 ? "WEEK IN PROGRESS" : "MY DIET SET",
  };
}

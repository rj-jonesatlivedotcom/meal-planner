/** Enhance the native disclosure without overriding the reader's choice. */
export function watchRecipeGuideLayout(
  ingredients: HTMLElement,
  guide: HTMLDetailsElement,
  methodColumn: HTMLElement,
): () => void {
  const sections = ingredients.parentElement;
  if (!sections) return () => {};
  const desktop = window.matchMedia("(min-width: 1024px)");
  const summary = guide.querySelector("summary");
  let userControlled = false;
  let active = true;
  let frame: number | undefined;

  const measure = () => {
    frame = undefined;
    if (!active || guide.contains(document.activeElement)) return;
    if (!desktop.matches) {
      delete sections.dataset.guidePlacement;
      if (!userControlled) guide.open = false;
      return;
    }
    const ingredientsBottom = ingredients.getBoundingClientRect().bottom;
    const methodBottom = methodColumn.getBoundingClientRect().bottom;
    sections.dataset.guidePlacement = ingredientsBottom < methodBottom ? "ingredients" : "nutrition";
    if (userControlled) return;
    const available = Math.max(ingredientsBottom, methodBottom) - guide.getBoundingClientRect().top;
    // Open and measure the real content in the same frame; no duplicate text or
    // estimated character counts. Closing it again happens before painting.
    guide.open = true;
    guide.open = guide.getBoundingClientRect().height <= available;
  };
  const schedule = () => {
    if (frame === undefined && active) frame = window.requestAnimationFrame(measure);
  };
  const rememberChoice = () => { userControlled = true; };
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
  // Do not observe the guide itself: opening it must not cause a resize loop.
  [ingredients, methodColumn].forEach(element => observer?.observe(element));
  summary?.addEventListener("click", rememberChoice);
  desktop.addEventListener("change", schedule);
  window.addEventListener("resize", schedule);
  document.fonts?.ready.then(schedule);
  schedule();

  return () => {
    active = false;
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    observer?.disconnect();
    delete sections.dataset.guidePlacement;
    summary?.removeEventListener("click", rememberChoice);
    desktop.removeEventListener("change", schedule);
    window.removeEventListener("resize", schedule);
  };
}

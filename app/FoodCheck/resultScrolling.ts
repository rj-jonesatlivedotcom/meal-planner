/** Scroll the document, leaving the nested food list and input focus alone. */
export function scrollToFoodCheckResults(target: HTMLElement) {
  const viewportTop = window.visualViewport?.offsetTop ?? 0;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  let visibleTop = viewportTop + 16;
  const header = document.querySelector("header");
  if (header) {
    const position = window.getComputedStyle(header).position;
    if (position === "fixed" || position === "sticky") {
      visibleTop = Math.max(visibleTop, header.getBoundingClientRect().bottom + 16);
    }
  }
  const rect = target.getBoundingClientRect();
  const previewHeight = Math.min(rect.height, 160, Math.max(0, viewportHeight - 32));
  // Avoid a jump when the heading and initial result content are already visible.
  if (rect.top >= visibleTop && rect.top + previewHeight <= viewportTop + viewportHeight - 16) return;
  window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - visibleTop), behavior: "auto" });
}

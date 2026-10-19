/** Scrolls to an element by ID, accounting for a sticky header offset. */
export function scrollToElement(elementId: string, offset = 0): void {
  setTimeout(() => {
    const el = document.getElementById(elementId);
    if (!el) {
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 200);
}

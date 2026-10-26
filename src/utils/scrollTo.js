export function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop(smooth?: boolean) {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * time));
}

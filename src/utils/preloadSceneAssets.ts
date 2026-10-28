import { technologies, experiences } from "../constants";
import { MODELS_MEDIA_QUERY } from "../constants/models";

function runWhenIdle(callback: () => void, timeout = 1200): () => void {
  // Safari has no requestIdleCallback (the DOM types assume it always exists)
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(id);
}

function decodeImage(src: string): Promise<void> {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
}

/**
 * Once the browser is idle, warm up what's further down the page: tech/company logos
 * everywhere, plus the Contact 3D scene on screens wide enough to show it.
 * Returns a cancel function.
 */
export function preloadPortfolioAssets(): () => void {
  let cancelled = false;

  const cancelIdle = runWhenIdle(async () => {
    [...technologies, ...experiences].forEach(({ icon }) => decodeImage(icon));

    if (window.matchMedia(MODELS_MEDIA_QUERY).matches) {
      const [{ preloadDroneModel }] = await Promise.all([
        import("../components/canvas/preloadModels"),
        import("../components/canvas/Earth"),
      ]);
      if (!cancelled) preloadDroneModel();
    }
  });

  return () => {
    cancelled = true;
    cancelIdle();
  };
}

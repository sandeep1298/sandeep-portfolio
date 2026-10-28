import { useSyncExternalStore } from "react";

/**
 * One shared, passive scroll listener for the whole app.
 * Components subscribe to derived booleans, so they only re-render when that boolean flips.
 */
const SCROLL_IDLE_MS = 160;

const listeners = new Set<() => void>();
let scrollY = 0;
let isScrolling = false;
let frameId: number | null = null;
let idleTimeoutId: number | undefined;

function emit() {
  listeners.forEach((listener) => listener());
}

function handleScroll() {
  if (frameId === null) {
    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      scrollY = window.scrollY;
      isScrolling = true;
      emit();
    });
  }

  window.clearTimeout(idleTimeoutId);
  idleTimeoutId = window.setTimeout(() => {
    isScrolling = false;
    emit();
  }, SCROLL_IDLE_MS);
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1) {
    scrollY = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimeoutId);
      frameId = null;
      idleTimeoutId = undefined;
      isScrolling = false;
    }
  };
}

const getServerSnapshot = () => false;

/** True while the user is scrolling; false shortly after scrolling stops. */
export function useIsScrolling(): boolean {
  return useSyncExternalStore(subscribe, () => isScrolling, getServerSnapshot);
}

/** True once the page has scrolled further than `offset` pixels. */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => scrollY > offset,
    getServerSnapshot,
  );
}

import { useEffect, useSyncExternalStore } from "react";

const listeners = new Set();
let isScrolling = false;
let timeoutId = null;
let frameId = null;
let activeIdleMs = 160;

function emit() {
  listeners.forEach((listener) => listener());
}

function setScrolling(nextValue) {
  if (isScrolling === nextValue) return;
  isScrolling = nextValue;
  emit();
}

function handleScroll() {
  if (frameId === null) {
    frameId = window.requestAnimationFrame(() => {
      setScrolling(true);
      frameId = null;
    });
  }

  window.clearTimeout(timeoutId);
  timeoutId = window.setTimeout(() => {
    setScrolling(false);
  }, activeIdleMs);
}

function subscribe(listener) {
  listeners.add(listener);

  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      timeoutId = null;
      frameId = null;
      setScrolling(false);
    }
  };
}

function getSnapshot() {
  return isScrolling;
}

/** True while the user is scrolling; false shortly after scroll stops. */
export function useScrollIdle(idleMs = 160) {
  useEffect(() => {
    activeIdleMs = idleMs;
  }, [idleMs]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

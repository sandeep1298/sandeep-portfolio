import { useEffect, useSyncExternalStore } from "react";

const surfaces = new Map();
const listeners = new Set();

function pickFocusedId() {
  let focusedId = null;
  let bestRatio = 0;

  surfaces.forEach(({ visible, ratio }, id) => {
    if (visible && ratio > bestRatio) {
      bestRatio = ratio;
      focusedId = id;
    }
  });

  return focusedId;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return pickFocusedId();
}

function notify() {
  listeners.forEach((listener) => listener());
}

function setSurface(id, visible, ratio) {
  surfaces.set(id, { visible, ratio });
  notify();
}

function removeSurface(id) {
  surfaces.delete(id);
  notify();
}

/** Only one heavy model canvas runs at a time (highest visible intersection ratio). */
export function useWebGLFocus(id, visible, intersectionRatio) {
  useEffect(() => {
    setSurface(id, visible, intersectionRatio);
    return () => removeSurface(id);
  }, [id, intersectionRatio, visible]);

  const focusedId = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return visible && focusedId === id;
}

import { useEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Scroll-spy store. Sections register themselves; a single IntersectionObserver watches a
 * thin band across the middle of the viewport, and whichever section crosses it is active.
 * Subscribers re-render only when the active section changes.
 */
const listeners = new Set<() => void>();
const visible = new Map<string, boolean>();
let activeId: string | null = null;
let observer: IntersectionObserver | null = null;

function recompute() {
  let next: string | null = null;
  for (const [id, isVisible] of visible) {
    if (isVisible) {
      next = id;
      break;
    }
  }
  if (next === activeId) return;
  activeId = next;
  listeners.forEach((listener) => listener());
}

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.section;
          if (id) visible.set(id, entry.isIntersecting);
        });
        recompute();
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
  }
  return observer;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Register a section element (by ref) under `id` for the scroll-spy. */
export function useRegisterSection(id: string, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !id) return undefined;

    node.dataset.section = id;
    visible.set(id, false);
    const sectionObserver = getObserver();
    sectionObserver.observe(node);

    return () => {
      sectionObserver.unobserve(node);
      visible.delete(id);
      recompute();
    };
  }, [id, ref]);
}

/** The id of the section currently in the middle of the screen, or null (e.g. in the Hero). */
export function useActiveSection(): string | null {
  return useSyncExternalStore(subscribe, () => activeId, () => null);
}

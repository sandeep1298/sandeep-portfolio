const MODEL_PATHS = [
  "./desktop_pc/wall-e_and_eve-opt.glb",
  "./drone/drone_concept-superopt.glb",
];

function runWhenIdle(callback, timeout = 1200) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(id);
}

function decodeImage(src) {
  if (!src || typeof Image === "undefined") {
    return Promise.resolve();
  }

  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";
  image.src = src;

  if (image.decode) {
    return image.decode().catch(() => {});
  }

  return Promise.resolve();
}

export function preloadPortfolioAssets({ technologies = [], experiences = [] } = {}) {
  let cancelled = false;

  const cancelIdle = runWhenIdle(async () => {
    const [{ useGLTF }] = await Promise.all([
      import("@react-three/drei/core/Gltf.js"),
      import("../components/canvas/Computers"),
      import("../components/canvas/Earth"),
      import("../components/canvas/Stars.jsx"),
    ]);

    if (cancelled) return;

    MODEL_PATHS.forEach((path) => {
      useGLTF.preload(path);
    });

    const imageSources = [
      ...technologies.map((technology) => technology.icon),
      ...experiences.map((experience) => experience.icon),
    ];

    imageSources.forEach((src) => {
      decodeImage(src);
    });
  });

  return () => {
    cancelled = true;
    cancelIdle();
  };
}

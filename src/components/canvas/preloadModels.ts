import { useGLTF } from "@react-three/drei";
import { MODEL_PATHS } from "../../constants/models";

/** Start downloading and parsing the Contact section's drone model ahead of time. */
export function preloadDroneModel() {
  useGLTF.preload(MODEL_PATHS.drone);
}

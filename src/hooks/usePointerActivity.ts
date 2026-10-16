import { useEffect, useState } from "react";

export interface PointerActivityOptions {
  idleDelay?: number;
  rightThreshold?: number;
  verticalThreshold?: number;
}

/** Reveal floating navigation briefly after pointer activity near the navigation area. */
export function usePointerActivity(
  optionsOrDelay: number | PointerActivityOptions = {}
) {
  const options =
    typeof optionsOrDelay === "number"
      ? { idleDelay: optionsOrDelay }
      : optionsOrDelay;

  const {
    idleDelay = 1400,
    rightThreshold = 100,
    verticalThreshold = 220,
  } = options;

  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      setActive(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setActive(false), idleDelay);
    };

    const isInsideDetectionArea = (e: PointerEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Limit horizontal detection to right area near the navigation bar
      const threshold = Math.min(rightThreshold, windowWidth * 0.25);
      const inHorizontalRange = e.clientX >= windowWidth - threshold;

      // Limit vertical detection around the vertical center where DotNav is positioned
      const centerY = windowHeight / 2;
      const inVerticalRange = Math.abs(e.clientY - centerY) <= verticalThreshold;

      return inHorizontalRange && inVerticalRange;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isInsideDetectionArea(e)) {
        reveal();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (isInsideDetectionArea(e)) {
        reveal();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [idleDelay, rightThreshold, verticalThreshold]);

  return active;
}


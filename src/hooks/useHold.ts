import { useState, useEffect, useRef, useCallback } from "react";
import { LEFT_CLICK } from "../utils/constants";
import { Nullable } from "../types/types";

export const useHold = (): [boolean] => {
  const [isHolded, setIsHolded] = useState(false);
  const waitTimer = useRef<Nullable<NodeJS.Timeout>>(null);
  const mouseIsDown = useRef<Nullable<boolean>>(null);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button !== LEFT_CLICK) {
      return;
    }

    mouseIsDown.current = true;
    waitTimer.current = setTimeout(function () {
      if (mouseIsDown) {
        setIsHolded(true);
      }
    }, 200);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (waitTimer.current !== null) {
      clearTimeout(waitTimer.current);
    }
    mouseIsDown.current = false;
    setIsHolded(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  return [isHolded];
};

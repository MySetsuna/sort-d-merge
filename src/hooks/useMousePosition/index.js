import { useCallback, useState } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const setFromEvent = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  };
  const positionActive = useCallback(() => {
    window.addEventListener("mousemove", setFromEvent);
  }, [])

  const positionInActive = useCallback(() => {
    window.removeEventListener("mousemove", setFromEvent);
  }, [])

  return [position, {
    active: positionActive,
    inActive: positionInActive
  }];
};

export default useMousePosition
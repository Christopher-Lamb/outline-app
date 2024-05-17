import { useEffect } from "react";

function debounce(func, delay) {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
function useDebouncedResize(effect, delay) {
  useEffect(() => {
    const debouncedEffect = debounce(effect, delay);

    window.addEventListener("resize", debouncedEffect);

    return () => {
      window.removeEventListener("resize", debouncedEffect);
    };
  }, [effect, delay]); // Dependencies array includes effect and delay
}

export default useDebouncedResize;

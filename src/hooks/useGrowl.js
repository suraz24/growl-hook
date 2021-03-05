import { useEffect, useState } from "react";

export const useGrowl = (timeout = 3) => {
  const [growlActive, setGrowlActive] = useState(false);
  const timeoutInMs = timeout * 1000;

  useEffect(() => {
    let timeoutHandler;
    if (growlActive) {
      timeoutHandler = setTimeout(() => {
        setGrowlActive(false);
      }, timeoutInMs);
    }
    return () => {
      if (timeoutHandler) {
        clearTimeout(timeoutHandler);
      }
    };
  }, [growlActive, timeoutInMs]);

  return [
    // the first arg is the state
    growlActive,

    // the second arg is a fn that allows you to safely set its state
    (active) => {
      setGrowlActive(active);
    },
  ];
};

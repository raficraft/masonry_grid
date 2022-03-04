import { useEffect, useRef, useState } from "react";

export const useClickOutside = (init) => {
  const refOutsideClick = useRef(null);
  const [show, setShow] = useState(init);

  const handleClickOutside = (event) => {
    if (
      refOutsideClick.current &&
      !refOutsideClick.current.contains(event.target)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refOutsideClick]);

  return [show, setShow, refOutsideClick];
};

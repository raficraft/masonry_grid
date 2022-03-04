import React, { useLayoutEffect } from "react";

import S from "./Aside.module.scss";
import { useClickOutside } from "../../hooks/useClickOutside";
import useMediaQuery from "../../hooks/useMediaQueries";

export default function Aside({ children }) {
  const [show, setShow, refOutsideClick] = useClickOutside(false);

  function toggle_aside() {
    setShow(!show);
  }

  return (
    <aside className={S.aside_link} data-show={show} ref={refOutsideClick}>
      <div className={S.aside_link_container}>{children}</div>

      <button
        className={S.mobil_toggle}
        onClick={() => {
          toggle_aside();
        }}
      >
        <span className={S.dotted_menu}></span>
      </button>
    </aside>
  );
}

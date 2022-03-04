import React from "react";
import S from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <header className={S.header_top}>
        <h1 className={S.title}>Mansonry Grid demo</h1>
      </header>
      {children}
    </>
  );
}

"use client";

import { Test } from "@/components/Test/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./page.module.scss";

import { useEffect } from "react";
import { NavbarProvider, useNavbar } from "@/components/Navbar/NavbarContext";

function favPage() {
  // const { setActivePage } = useNavbar(); // Отримайте setActivePage з контексту

  // useEffect(() => {
  //   setActivePage(2);
  // }, []);

  return (
    // <NavbarProvider>
    <div className={s.Global}>
      <Test />
    </div>
    // </NavbarProvider>
  );
}

export default favPage;

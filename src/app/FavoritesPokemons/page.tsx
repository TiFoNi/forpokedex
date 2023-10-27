"use client";

import { Test } from "@/components/Test/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./page.module.scss";

import { useEffect } from "react";

function favPage() {
  return (
    <div className={s.Global}>
      <Test />
    </div>
  );
}

export default favPage;

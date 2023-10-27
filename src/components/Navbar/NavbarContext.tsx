"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type NavbarContextType = {
  activePage: number;
  setActivePage: (page: number) => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState(1);

  return (
    <NavbarContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}

"use client";
import Link from "next/link";
import { useState } from "react";
import s from "./NavBar.module.scss";
import { Image } from "react-bootstrap";

const Navbar = () => {
  const [activePage, setActivePage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ActivePageChanger = (x: number) => {
    setActivePage(x);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={s.cont}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            Pokedex
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${isMenuOpen ? " show" : ""}${
              isMenuOpen ? " " + s.forMargin : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  href="/HomePage"
                  onClick={() => ActivePageChanger(1)}
                  className={`${
                    activePage === 1 ? "nav-link " + s.activePage : "nav-link"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/FavoritesPokemons"
                  onClick={() => ActivePageChanger(2)}
                  className={`${
                    activePage === 2 ? "nav-link " + s.activePage : "nav-link"
                  }`}
                >
                  Favorites Pokemons
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.AvatarPlace}>
          <Link
            href="/Login"
            className={s.AvatarLink}
            onClick={() => ActivePageChanger(3)}
          >
            <Image
              src="./NoneAvatar.jpg"
              className={`${s.AvatarImage} rounded-circle `}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

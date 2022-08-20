import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(x) {
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link className=" leading-relaxed inline-block mr-4 whitespace-nowrap" to="/">
              <img alt="..." className="w-[3rem] h-[3rem]" src={require("assets/img/logo.png")} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

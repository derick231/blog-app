import React, { useState } from "react";
import { Spiral as Hamburger } from "hamburger-react";
import Images from "./Images";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/stories", label: "Stories" },
  { to: "/resources", label: "Resources" },
];

const linkClass =
  "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full text-white h-16 md:h-20 px:8 md:px-16 flex items-center justify-between ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Images
          src="Diego (2).png"
          alt="logo"
          className={"w-16 h-16"}
          w={500}
          h={500}
        />
        <h1>Blog</h1>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Hamburger Button Wrapper - High Z-Index to stay on top */}
        <div className="relative z-50">
          <Hamburger toggled={open} toggle={setOpen} size={25} />
        </div>

        <div
          className={`w-full h-screen flex flex-col fixed top-0 left-0 bg-[#0b1c2d] z-40 items-center justify-center gap-8
          text-lg font-medium transition-all ease-in-out duration-500
          ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className={linkClass}
              onClick={() => setOpen(false)} // Close menu on link click
            >
              {label}
            </Link>
          ))}

          <SignedOut>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-3 rounded-full bg-white text-black border">
                Login
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map(({ to, label }) => (
          <Link key={label} to={to} className={linkClass}>
            {label}
          </Link>
        ))}

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-3 rounded-full bg-white text-black border">
              Login
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;

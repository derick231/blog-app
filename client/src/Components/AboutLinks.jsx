import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AboutLinks = () => {
  const [open, setOpen] = useState(false);

  const aboutLinks = [
    { id: "about", to: "/about", label: "About Us" },
    { id: "mission", to: "/mission", label: "Our Mission" },
    { id: "vision", to: "/vision", label: "Our Vision" },
    { id: "history", to: "/history", label: "Our History" },
  ];

  return (
    <>
      <button
        className="bg-[#0b1c2d] p-3 text-white lg:hidden rounded-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "close" : "menu"}
      </button>

      <div
        className={`${open ? "block" : "hidden"} lg:block bg-white w-full
        flex flex-col rounded-lg shadow pb-4 sticky top-8 mt-4`}
      >
        <div className="bg-black text-white h-16 ps-4 pt-4 rounded-t-lg">
          <h2 className="text-lg md:text-xl">Elements</h2>
        </div>

        <div className="flex flex-col gap-4 ps-4 pt-4">
          {aboutLinks.map(({ id, to, label }) => (
            <NavLink
              key={id}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-red-800 font-medium"
                  : "text-black hover:text-red-800 duration-300"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutLinks;

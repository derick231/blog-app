import React from "react";
import Search from "./Search";

const SideMenu = () => {
  return (
    <div className="text-xs top-8 sticky px-4">
      <h2 className="">Search</h2>
      <Search />
      <h2 className="mt-4">Filter</h2>
      <div className="flex flex-col gap-2 cursor-pointer mt-4">
        <label className="flex items-center gap-2" htmlFor="">
          <input
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none w-4 h-4 border border-black rounded-sm checked:bg-black"
          />
          Newest
        </label>
        <label className="flex items-center gap-2" htmlFor="">
          <input
            type="radio"
            name="sort"
            value="popular"
            className="appearance-none w-4 h-4 border border-black rounded-sm checked:bg-black"
          />
          Popular
        </label>
        <label className="flex items-center gap-2" htmlFor="">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border border-black rounded-sm checked:bg-black"
          />
          Oldest
        </label>
      </div>
    </div>
  );
};

export default SideMenu;

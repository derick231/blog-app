import React from "react";

const Search = () => {
  return (
    <div className="bg-gray-200 w-max p-2 rounded-full flex items-center gap-2 mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000000"
          d="M10.44 3a7.44 7.44 0 1 0 4.803 13.122c-.022.271.07.55.278.757l3.84 3.84a.96.96 0 1 0 1.358-1.358l-3.84-3.84a.96.96 0 0 0-.757-.278A7.44 7.44 0 0 0 10.44 3m-6 7.44a6 6 0 1 1 12 0a6 6 0 0 1-12 0"
        />
      </svg>
      <input type="text" placeholder="search posts..." className="bg-transparent text-black outline-none" />
    </div>
  );
};

export default Search;

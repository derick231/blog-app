import React from "react";

const SideMenu = () => {
  return (
    <div className="text-xs top-8 sticky px-4 cursor-pointer flex flex-col gap-4">
      {/* Feature post */}
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          height={20}
          width={20}
        >
          <path
            d="M128,189.09l54.72,33.65a8.4,8.4,0,0,0,12.52-9.17l-14.88-62.79,48.7-42A8.46,8.46,0,0,0,224.27,94L160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
          />
        </svg>
        <span>Feature this post</span>
      </div>
      {/* Delete post */}
      <div className="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={20} height={20}>
          <rect width="256" height="256" fill="none" />
          <line
            x1="216"
            y1="56"
            x2="40"
            y2="56"
            fill="none"
            stroke="maroon"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <line
            x1="88"
            y1="24"
            x2="168"
            y2="24"
            fill="none"
            stroke="maroon"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <path
            d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
            fill="none"
            stroke="maroon"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
        <span>Delete this post</span>
      </div>
    </div>
  );
};

export default SideMenu;

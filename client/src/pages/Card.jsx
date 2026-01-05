import React from "react";
import Images from "../Components/Images";
import { Link } from "react-router-dom";

const Card = ({src, w, h,title,content, path}) => {
  return (
    <div className="md:w-1/3 py-5 border-t shadow-md flex flex-col rounded-lg overflow-hidden gap-4 flex-wrap items-center hover:border duration-500 group ">
      <Images className={`group-hover:scale-110 duration-500 ease-in-out`} src={src} w={w} h={h} />
      <h2 className="text-md md:text-lg group-hover:text-red-800 duration-500">{title}</h2>
      <p className="text-sm md:text-md">{content}</p>
      <Link to={path} className="text-sm bg-transparent shadow-lg border-t p-3 rounded-full hover:bg-black hover:text-white duration-500 mb-10">Read More</Link>
    </div>
  );
};

export default Card;

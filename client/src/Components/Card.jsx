import React from "react";
import Images from "./Images";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Card = ({ resource }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.1 }}
      className="md:w-1/5 pb-5 shadow-lg  hover:border-gray-300 duration-200 bg-[#f5f5f5] ease-inshadow-md flex flex-col rounded-lg overflow-hidden gap-4 items-center hover:border group"
    >
      {resource.img && (
        <div className="overflow-hidden w-full p-2">
          <Images
            className="rounded-xl duration-500 ease-in-out w-full"
            src={resource.img}
            w="400"
            h="300"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-3 items-center">
        <h2 className="text-sm md:text-md uppercase text-center group-hover:text-red-800 duration-500">
          {resource.title}
        </h2>
        <p className="text-xs text-center">{resource.desc}</p>
        <Link
          to={resource.slug}
          className="w-max text-sm bg-transparent shadow-lg border-t px-3 py-2 rounded-full hover:bg-black hover:text-white duration-500"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;

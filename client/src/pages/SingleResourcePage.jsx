import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Images from "../Components/Images";
import { useState } from "react";
import PostMenuActions from "../Components/PostMenuActions";
import SideMenu from "../Components/SideMenu";

const fetchResource = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/resources/${slug}`
  );
  return res.data;
};

const renderContent = (html) => {
  const sanitized = DOMPurify.sanitize(html);

  return sanitized.replace(
    /(https?:\/\/[^\s]+\.mp4)/g,
    `<video controls class="w-full rounded-lg my-4">
      <source src="$1" type="video/mp4" />
    </video>`
  );
};

const SingleResourcePage = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["resource", slug],
    queryFn: () => fetchResource(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!";
  if (!data) return "Post not found!";

  return (
    <div>
      <div className="bg-[#0b1c2d]">
        <Navbar />
      </div>
      <div className="px-8 lg:px-16">
        {/* titles */}
        <div className="py-5 lg:py-10 ">
          <h1 className="text-red-800 mb-5 text-2xl md:text-4xl">
            {data.title}
          </h1>
          <div className="flex gap-10 justify-between">
            <p>{data.desc}</p>
            {data.img && (
              <div className="hidden lg:block lg:w-2/5">
                <Images
                  src={data.img}
                  w="600"
                  h="400"
                  className="rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
        {/* contents */}
        <div className="flex flex-col lg:flex-row  gap-5 lg:gap-10 py-5 lg:py-10">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden bg-transparent px-3 py-2 w-max shadow-lg rounded-full hover:bg-black hover:text-white"
          >
            {open ? "close" : "menu"}
          </button>

          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:justify-between w-full">
            <div
              className="text-sm/6 break-words text-start quill-content"
              dangerouslySetInnerHTML={{
                __html: renderContent(data.content),
              }}
            />

            {/* menu */}
            <div className={`${open ? "block" : "hidden"} lg:block `}>
              <SideMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResourcePage;

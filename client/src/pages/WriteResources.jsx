import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Upload from "../Components/Upload";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const WriteResources = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const quillRef = useRef(null);

  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");

  // ✅ admin role from Clerk
  const role = user?.publicMetadata?.role;

  // -----------------------------
  // CREATE RESOURCE
  // -----------------------------
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = await getToken();

      return axios.post(
        `${import.meta.env.VITE_API_URL}/resources`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Resource created successfully");
      setContent("");
      setImg("");
      setVideo("");
    },
    onError: (err) => {
      toast.error(err.response?.data || "Creation failed");
    },
  });

  // -----------------------------
  // GUARDS
  // -----------------------------
  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return (
      <>
        <Navbar />
        <div className="px-8 py-10 text-red-500">
          You must be logged in.
        </div>
      </>
    );
  }

  if (role !== "admin") {
    return (
      <>
        <Navbar />
        <div className="px-8 py-10 text-red-500">
          Admin access only.
        </div>
      </>
    );
  }

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const desc = form.get("desc");

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    mutation.mutate({
      title,
      desc,
      content,
      img,
      video,
    });
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <>
      <div className="bg-[#0b1c2d]">
        <Navbar />
      </div>

      <div className="px-8 lg:px-16 py-10">
        <h1 className="text-xl md:text-3xl mb-6">
          Create a new resource
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Upload
            type="image"
            name="Add cover image"
            onUploadComplete={(data) => setImg(data.url)}
          />

          <Upload
            type="video"
            name="Add video"
            onUploadComplete={(data) => setVideo(data.url)}
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="outline-none placeholder:italic"
          />

          <textarea
            name="desc"
            placeholder="Short description"
            className="bg-[#f5f5f5] rounded-lg p-3 outline-none shadow-lg"
          />

          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            theme="snow"
            className="bg-[#f5f5f5] min-h-[300px]"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[#f5f5f5] text-black hover:bg-black hover:text-white border rounded-full px-4 py-2 duration-300 shadow-lg w-40 disabled:bg-slate-500"
          >
            {mutation.isPending ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </>
  );
};

export default WriteResources;

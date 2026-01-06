import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Upload from "../Components/Upload";
import Navbar from "../Components/Navbar";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const quillRef = useRef(null);

  /* ================= STATE ================= */
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);

  /* ================= AUTH GUARDS ================= */
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You need to log in!</div>;

  /* ================= MUTATION ================= */
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();

      return axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.success("Post created successfully 🎉");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("Post creation failed");
    },
  });

  /* ================= INSERT MEDIA ================= */
  const insertIntoEditor = (type, url) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);

    editor.insertEmbed(range.index, type, url, "user");
    editor.insertText(range.index + 1, "\n");
    editor.setSelection(range.index + 2);
  };

  /* ================= QUILL CONFIG ================= */
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: () =>
          document.getElementById("quill-image-upload")?.click(),
        video: () =>
          document.getElementById("quill-video-upload")?.click(),
      },
    },
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formData.get("title") || !content) {
      toast.error("Title and content are required");
      return;
    }

    mutation.mutate({
      title: formData.get("title"),
      desc: formData.get("desc"),
      content,
      img,
    });
  };

  /* ================= UI ================= */
  return (
    <div>
      <div className="bg-[#0b1c2d]">
        <Navbar />
      </div>

      <div className="flex flex-col py-5 md:py-10 px-8 lg:px-16">
        <h1 className="text-xl mb-5">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* COVER IMAGE */}
          <Upload
            type="image"
            name="Add Cover Image"
            onUploadComplete={(data) => setImg(data.url)}
          />

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="My story"
            className="bg-transparent outline-none text-xl placeholder:italic"
          />

          {/* DESCRIPTION */}
          <textarea
            name="desc"
            placeholder="A short description"
            className="p-3 rounded-lg shadow-lg bg-[#f5f5f5] outline-none"
          />

          {/* HIDDEN EDITOR UPLOADS */}
          <div className="hidden">
            <Upload
              id="quill-image-upload"
              type="image"
              name="Upload Image"
              onUploadComplete={(data) =>
                insertIntoEditor("image", data.url)
              }
            />

            <Upload
              id="quill-video-upload"
              type="video"
              name="Upload Video"
              onUploadComplete={(data) =>
                insertIntoEditor("video", data.url)
              }
            />
          </div>

          {/* EDITOR */}
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className="bg-[#f5f5f5] min-h-[300px] rounded-xl"
          />

          {/* SUBMIT */}
          <button
            disabled={mutation.isPending}
            className="bg-[#f5f5f5] text-black hover:bg-black hover:text-white border rounded-full px-4 py-2 duration-300 shadow-lg w-36 disabled:bg-slate-500"
          >
            {mutation.isPending ? "Publishing..." : "Send"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Write;

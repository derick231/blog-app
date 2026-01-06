import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../Components/Upload";
import Navbar from "../Components/Navbar";
import BlotFormatter from "quill-blot-formatter";

// ✅ Register blot formatter (Quill v2 compatible)
Quill.register("modules/blotFormatter", BlotFormatter);

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const quillRef = useRef(null);

  // Editor content
  const [content, setContent] = useState("");

  // Cover image
  const [img, setImg] = useState(null);

  /* ================= MUTATION ================= */
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created 🎉");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("Post creation failed");
    },
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You need to log in!</div>;

  /* ================= INSERT MEDIA INTO EDITOR ================= */
  const insertIntoEditor = (type, url) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);

    editor.insertEmbed(range.index, type, url, "user");
    editor.insertText(range.index + 1, "\n"); // force block
    editor.setSelection(range.index + 2);
  };

  /* ================= QUILL MODULES ================= */
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
          document.getElementById("quill-image-upload").click(),
        video: () =>
          document.getElementById("quill-video-upload").click(),
      },
    },
    blotFormatter: {
      overlay: {
        style: {
          border: "2px solid #3b82f6",
        },
      },
    },
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    mutation.mutate({
      title: formData.get("title"),
      desc: formData.get("desc"),
      content,
      img,
    });
  };

  return (
    <div className=" ">
      <div className="bg-[#0b1c2d]">

      <Navbar/>
      </div>

    <div className=" flex flex-col  py-5 md:py-10 px-8 lg:px-16 ">
      <h1 className="text-xl  mb-5">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* ================= COVER IMAGE ================= */}
        <Upload
          type="image"
          name="Add Cover Image"
          onUploadComplete={(data) => setImg(data.url)}
        />

        {/* ================= TITLE ================= */}
        <input
          type="text"
          name="title"
          placeholder="My story"
          className="bg-transparent outline-none text-xl text-black placeholder:text-gray-500 placeholder:italic"
        />

        {/* ================= DESCRIPTION ================= */}
        <textarea
          name="desc"
          placeholder="A short description"
          className="p-2 rounded-lg shadow-lg outline-none text-black bg-[#f5f5f5]"
        />

        {/* ================= HIDDEN UPLOADS FOR EDITOR ================= */}
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

        {/* ================= EDITOR ================= */}
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          className="rounded-xl bg-[#f5f5f5] min-h-[300px]"
        />

        {/* ================= SUBMIT ================= */}
        <button
          disabled={mutation.isPending}
          className="bg-[#f5f5f5] text-black hover:bg-black hover:text-white border rounded-full px-3 py-2 duration-300 ease-in-out shadow-lg w-36 disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Publishing..." : "Send"}
        </button>
        
      </form>
    </div>
    </div>

  );
};

export default Write;

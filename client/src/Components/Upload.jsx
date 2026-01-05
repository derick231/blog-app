import { upload } from "@imagekit/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Upload = ({ type = "image", onUploadComplete,name,id }) => {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const acceptMap = {
    image: "image/*",
    video: "video/*",
    all: "image/*,video/*",
  };

  const authenticator = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!res.ok) {
      throw new Error("ImageKit authentication failed");
    }

    return res.json();
  };

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      toast.error("Please upload a video file");
      return;
    }

    try {
      const auth = await authenticator();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: import.meta.env.VITE_IK_PUBLIC_KEY,
        urlEndpoint: import.meta.env.VITE_IK_URL_ENDPOINT,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        onProgress: (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      });

      toast.success(
        `${type === "video" ? "Video" : "Image"} uploaded successfully 🎉`
      );

      onUploadComplete({
        url: res.url,
        fileType: res.fileType,
        name: res.name,
      });

      setProgress(0);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      toast.error("Upload failed");
    }
  };

  return (
    <>
      {/* 🔒 Hidden file input */}
      <input
      id={id}
        type="file"
        ref={fileInputRef}
        accept={acceptMap[type]}
        style={{ display: "none" }}
        onChange={handleUpload} // auto upload after selection
      />

      {/* 🔘 Trigger button/div */}
      <div
        onClick={handleFilePick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleFilePick()}
        className=""
      >
        <button type="button" className="bg-[#f5f5f5] text-xs text-gray-500 p-2 rounded-lg ">{name}</button>
      </div>

      {progress > 0 && <p>Uploading: {progress}%</p>}
    </>
  );
};

export default Upload;

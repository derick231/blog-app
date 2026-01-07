import React from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    enabled:  !!user, // 🔥
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;
  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/stories");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };
  return (
    <div>
      <h2 className="text-start my-2">Actions</h2>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "fetching failed"
      ) : (
        <div
          className="text-xs flex gap-2 cursor-pointer items-center"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            strokeWidth="20"
            stroke="black"
            width="20"
            height="20"
          >
            <path
              d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"
              fill={
                saveMutation.isPending
                  ? isSaved
                    ? "none"
                    : "black"
                  : isSaved
                  ? "black"
                  : "none"
              }
            />
          </svg>

          <span>Save this post</span>
          {saveMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="text-xs flex gap-2 mt-2 cursor-pointer items-center"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            height="20"
            width="20"
          >
            <rect width="256" height="256" fill="none" />
            <line
              x1="216"
              y1="56"
              x2="40"
              y2="56"
              fill="none"
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <line
              x1="104"
              y1="104"
              x2="104"
              y2="168"
              fill="none"
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <line
              x1="152"
              y1="104"
              x2="152"
              y2="168"
              fill="none"
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <path
              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
              fill="none"
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <path
              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
              fill="none"
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
          </svg>
          <span>Delete this post</span>
          {deleteMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostListPage from "./pages/PostListPage.jsx";
import Write from "./pages/Write.jsx";

import SinglePostPage from "./pages/SinglePostPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home.jsx";
import Stories from "./pages/Stories.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MissionPage from "./pages/MissionPage.jsx";
import VisionPage from "./pages/VisionPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";


const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/mission",
        element: <MissionPage/>
      },
      {
        path: "/vision",
        element: <VisionPage/>
      },
      {
        path: "/history",
        element: <HistoryPage/>
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/stories/:slug",
        element: <SinglePostPage />,
      },
       {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/stories",
        element: <Stories />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/resources",
        element: <ResourcesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
     
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);

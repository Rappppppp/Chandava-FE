import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "@layouts/MainLayout";

// auth
const LoginPage = lazy(() => import("@pages/Auth/LoginPage"));


// Lazy load pages
const LandingPage = lazy(() => import("@pages/LandingPage"));
const RoomDetails = lazy(() => import("@pages/RoomDetails"));



export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/:roomId", element: <RoomDetails /> },

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "*", element: <div>404</div>
  },
]);

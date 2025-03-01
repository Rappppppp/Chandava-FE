import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "@layouts/MainLayout";

// Lazy load pages
const LandingPage = lazy(() => import("@pages/LandingPage"));


export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <LandingPage /> }, 
    ],
  },
  
  { path: "*", element: <div>404</div> },
]);

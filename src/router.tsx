import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";

import { lazy } from "react";
import MainLayout from "@layouts/MainLayout";
import PrivateRoute from "@layouts/PrivateRoute";
import UserLayout from "@layouts/UserLayout";

// auth
const LoginPage = lazy(() => import("@pages/Auth/LoginPage"));
const RegistrationPage = lazy(() => import("@pages/Auth/RegistrationPage"));
const Unauthorized = lazy(() => import("@pages/Auth/Unauthorized"));



// Lazy load pages
const LandingPage = lazy(() => import("@pages/LandingPage"));
const RoomDetails = lazy(() => import("@pages/RoomDetails"));



export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "room/:roomId", element: <RoomDetails /> },

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },

  {
    path: "/unauthorized",
    element: (
      <AuthProvider>
        <Unauthorized />
      </AuthProvider>
    ),
  },


  {
    path: "/users",
    element: <PrivateRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "", element: <div>Hellooo layout</div> }
        ]
      }
    ],
  },

  {
    path: "/admin",
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      { path: "", element: <div>admin Homepage</div> },
      { path: "room/:roomId", element: <div>admin Room Details</div> },
    ],
  },

  {
    path: "*", element: <div>404</div>
  },
]);

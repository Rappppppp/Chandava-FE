import { createBrowserRouter } from "react-router-dom";


import { lazy } from "react";
import MainLayout from "@layouts/MainLayout";
import PrivateRoute from "@layouts/PrivateRoute";
import UserLayout from "@layouts/UserLayout";
import AdminLayout from "@layouts/AdminLayout";

// auth
const LoginPage = lazy(() => import("@pages/Auth/LoginPage"));
const RegistrationPage = lazy(() => import("@pages/Auth/RegistrationPage"));
const Unauthorized = lazy(() => import("@pages/Auth/Unauthorized"));



// Lazy load pages
const LandingPage = lazy(() => import("@pages/LandingPage"));
const RoomDetails = lazy(() => import("@pages/RoomDetails"));


const UserHomePage = lazy(() => import("@pages/users/UserHomePage"));
const UserBookingPage = lazy(() => import("@pages/users/UserBookingPage"));
const UserFavoritePage = lazy(() => import("@pages/users/UserFavoritesPage"));
const UserFeedbackPage = lazy(() => import("@pages/users/UserFeedbackPage"));
const UserCouponPage = lazy(() => import("@pages/users/UserCouponPage"));
const UserMessagesPage = lazy(() => import("@pages/users/UserMessagesPage"));


const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const ManageRooms = lazy(() => import("@pages/admin/ManageRooms"));
const Messages = lazy(() => import("@pages/admin/Messages"));
const Booking = lazy(() => import("@pages/admin/Booking"));
const Users = lazy(() => import("@pages/admin/Users"));


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

      <Unauthorized />

    ),
  },


  {
    path: "/users",
    element: <PrivateRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "home", element: <UserHomePage /> },
          { path: "room/:roomId", element: <RoomDetails /> },
          { path: "bookings", element: <UserBookingPage /> },
          { path: "favorites", element: <UserFavoritePage /> },
          { path: "feedbacks", element: <UserFeedbackPage /> },
          { path: "coupons", element: <UserCouponPage /> },
          { path: "messages", element: <UserMessagesPage /> },
          { path: "messages/:convoId", element: <UserMessagesPage /> },


        ]
      }
    ],
  },

  {
    path: "/admin",
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "manage-accommodations", element: <ManageRooms /> },
          { path: "bookings", element: <Booking /> },
          { path: "customers", element: <Users /> },
          { path: "messages", element: <Messages /> },
          { path: "messages/:convoId", element: <Messages /> },








        ]
      }
    ],
  },

  {
    path: "*", element: <div>404</div>
  },
]);

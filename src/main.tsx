import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import './index.css'
import { AuthProvider } from "@contexts/AuthContext";
import HamsterLoader from "./components/loaders/HamsterLoader";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
    <AuthProvider>
      <Suspense fallback={<div>
        <HamsterLoader />
      </div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>

  </React.StrictMode>
);

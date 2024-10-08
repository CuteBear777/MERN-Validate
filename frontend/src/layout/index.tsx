import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import React from "react";

export default function Layout() {
  const { user, getMe } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!user) {
        const success = await getMe();
        if (!success) navigate("/login");
      }
      setIsLoading(false);
    })();
  }, []);

  // if (isLoading) return null;

  return (
    <>
      <Header />
      <div id="main-body">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

import { Outlet } from "react-router-dom";
import { getTokenDuration } from "../utils/auth";
import { useSubmit } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

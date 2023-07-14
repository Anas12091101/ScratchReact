import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import ResetPage from "./pages/Reset";
import { action as resetAction } from "./pages/Reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "reset",
        element: <ResetPage />,
        action: resetAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

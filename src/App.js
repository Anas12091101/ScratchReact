import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as AuthAction,
} from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import OtpPage, { action as OtpAction } from "./pages/Otp";

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
        action: AuthAction,
      },
      {
        path: "otp",
        element: <OtpPage />,
        action: OtpAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

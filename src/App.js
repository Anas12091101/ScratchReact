import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as AuthAction,
} from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import OtpPage, { action as OtpAction } from "./pages/Otp";
import SubscriptionPage, {
  loader as subscriptionLoader,
} from "./pages/Subscription";
import { action as LogoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
      {
        path: "subscribe",
        element: <SubscriptionPage />,
        loader: subscriptionLoader,
      },
      {
        path: "logout",
        action: LogoutAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

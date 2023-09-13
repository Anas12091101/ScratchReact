import {
  RouterProvider,
  createBrowserRouter,
  // redirect,
} from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import ResetPage from "./pages/Reset";
import { action as resetAction } from "./pages/Reset";
import { action as LogoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";
import { homeLoader } from "./pages/Home";
import Chat, { ChatLoader } from "./pages/Chat";
import ChatRoom, { ChatRoomLoader } from "./pages/ChatRoom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "reset",
        element: <ResetPage />,
        action: resetAction,
      },
      {
        path: "logout",
        action: LogoutAction,
      },
      {
        path: "chat",
        children: [
          {
            index: true,
            element: <Chat />,
            loader: ChatLoader,
          },
          {
            path: ":roomName",
            element: <ChatRoom />,
            loader: ChatRoomLoader,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

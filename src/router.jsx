import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ForgotPass from "./Pages/ForgotPass";
import LogSignPage from "./Pages/LogSignPage";
import ChangePass from "./Pages/ChangePass";
import { rootLoader } from "./Loaders/rootLoader";
import UserNotConnected from "./ProtectedRoutes/UserNotConnected";
import UserConnected from "./ProtectedRoutes/UserConnected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // racine avec App
    loader: rootLoader,
    children: [
      {
        index: true, // équivalent de path: "/"
        element: (
          <UserNotConnected>
            <LogSignPage />
          </UserNotConnected>
        ),
      },
      {
        path: "/ForgotPass",
        element: <ForgotPass />,
      },
      {
        path: "/ChangePass",
        element: <ChangePass />,
      },
      {
        path: "/About",
        element: <AboutPage />,
      },
      {
        path: "/Home",
        element: (
          <UserConnected>
            <HomePage />
          </UserConnected>
        ),
      },
    ],
  },
]);

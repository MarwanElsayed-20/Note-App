import { lazy, Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Loading from "./components/Loading/Loading";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutesWithToken from "./components/ProtectedRoutesWithToke";
import Intro from "./components/Intro/Intro";

const Register = lazy(() => import("./components/Register/Register"));
const NotFound = lazy(() => import("./components/NotFound"));

const App: React.FunctionComponent<{}> = () => {
  const routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Intro /> },
        {
          path: "/login",
          element: (
            <ProtectedRoutesWithToken>
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </ProtectedRoutesWithToken>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;

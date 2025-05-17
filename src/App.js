import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { UserProvider } from "./context/userContext";

// redux store
import { Provider } from "react-redux";
import appStore from "./store";

// child components
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

const App = () => {
  return (
    <Provider store={appStore}>
      <UserProvider>
        <div className="h-[calc(100vh-90px)] w-full mt-[70px]">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserProvider>
    </Provider>
  );
};

export const appRouters = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <div className="min-h-[calc(100vh-126px)] w-full text-center py-6">
                Loading...
              </div>
            }
          >
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense
            fallback={
              <div className="min-h-[calc(100vh-126px)] w-full text-center py-6">
                Loading...
              </div>
            }
          >
            <Contact />{" "}
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

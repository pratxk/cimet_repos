// import { BrowserRouter, Routes, Route as R } from "react-router-dom";
import axios from "axios";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import ProductWrapper from "../components/ProductWrapper";
import SingleProduct from "../Pages/SingleProduct";
import Products from "../Pages/Products";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fetchProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const fetchSingleProduct = async (eventId) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${eventId.params.id}`
  );
  return response.data;
};
const fetchBlogs = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

const HomeRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductWrapper />,
        children: [
          {
            path: ":id",
            element: <SingleProduct />,
            loader: (id) => fetchSingleProduct(id),
          },
          {
            index: true,
            element: <Products />,
            loader: fetchProducts,
          },
        ],
      },
      {
        path: "/blog",
        element: <Blog />,
        loader: fetchBlogs,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const Route = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Route;
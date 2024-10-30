import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeRoute from './HomeRoute';
import Home from '../Pages/Home';
import ProductList from '../Pages/Product/ProductList';
import axios from 'axios';
import Cart from '../Pages/Cart';
import Contact from '../Pages/Contact';
import About from '../Pages/About';
import Blogs from '../Pages/Blogs/Blogs';
import { BlogContextProvider } from '../Context/BlogContext';
import SingleBlog from '../Pages/Blogs/SingleBlog';
import SingleProduct from '../Pages/Product/SingleProduct';

const fetchData  = async (url) => {
  const response = await axios.get(url);
  console.log(response)
  return {data: response.data};
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute val={false}/>,
    children: [
      {
        index: true,
        element: <Home/>,
        loader: ()=>{
          return fetchData('https://fakestoreapi.com/products?limit=4');
        },
      },
      {
        path: '/products',
        element: <HomeRoute val={true}/>,
        children: [
          {
            path: ':id',
            element: <SingleProduct/>,
            loader:(e)=>{
              console.log(e.params.id)
              return fetchData(`https://fakestoreapi.com/products/${e.params.id}`)
            }
          },
          {
            index: true,
            element: <ProductList/>,
            loader: ()=>{
              return fetchData('https://fakestoreapi.com/products');
            },
          }
        ]
      },
      {
        path: '/cart',
        element: <HomeRoute val={true} />,
        children: [
          {
            path: ':id',
            element: <h1>hello</h1>,
          },
          {
            index: true,
            element: <Cart />
          }
        ]
      },
      {
        path: '/contact',
        element: <HomeRoute val={true} />,
        children: [
          {
            path: ':id',
            element: <h1>hello</h1>,
          },
          {
            index: true,
            element: <Contact/>
          }
        ]
      },
      {
        path: '/about',
        element: <HomeRoute val={true} />,
        children: [
          {
            path: ':id',
            element: <h1>hello</h1>,
          },
          {
            index: true,
            element: <About />
          }
        ]
      },
      {
        path: '/blogs',
        element: <BlogContextProvider><HomeRoute val={true} /></BlogContextProvider>,
        children: [
          {
            path: ':id',
            element: <SingleBlog/>,
            loader:(e)=>{
              console.log(e.params.id)
              return fetchData(`https://jsonplaceholder.typicode.com/posts/${e.params.id}`)
            }
          },
          {
            index: true,
            element:<Blogs />,
            loader:()=>{
              return fetchData('https://jsonplaceholder.typicode.com/posts')
            }
          }
        ]
      }
    ]
  }
]);

const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default AllRoutes
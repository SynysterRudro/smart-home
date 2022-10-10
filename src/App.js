import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './/components/Home';
import Root from './components/Root';
import Shop from './components/Shop';
import About from './components/About';
import ErrorPage from './components/ErrorPage'
import { getStoredCart } from './utils/fakeDB';
import Cart from './components/Cart'


export const productsAndCartData = async () => {
  const productsData = await fetch('products.json');
  const products = await productsData.json();


  const savedCart = getStoredCart();
  const initialCart = [];

  for (const id in savedCart) {
    const foundProduct = products.find(product => product.id === id);
    if (foundProduct) {
      const quantity = savedCart[id];
      foundProduct.quantity = quantity;
      initialCart.push(foundProduct);
    }
  }

  return { products, initialCart };
}


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage></ErrorPage>,
      element: <Root></Root>,
      loader: productsAndCartData,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/home',
          element: <Home></Home>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: '/cart',
          element: <Cart></Cart>
        },
        {
          path: '/about',
          element: <About></About>
        }
      ]

    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App

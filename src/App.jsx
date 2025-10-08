import React from 'react'
import { store } from './store.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router'
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import ViewPaste from './components/ViewPaste.jsx';
import Paste from './components/Paste.jsx';
import { RouterProvider } from 'react-router';
import './App.css'
import { Bounce, ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <NavBar />
      <Home />
    </>
  }
  ,
  {
    path: "/pastes",
    element: <>
      <NavBar />
      <Paste />
    </>
  },
  {
    path: "/pastes/:id",
    element: <>
      <NavBar />
      <ViewPaste  />
    </>
  }

]);
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App

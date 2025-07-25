import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store'; // your Redux store
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/editPost";

import Post from "./pages/Post";

import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';

import NotFound from './pages/NotFound.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditProfile />
          </AuthLayout>
        )
      },
      {
        path: "*",
        element: (
          <NotFound/>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
);

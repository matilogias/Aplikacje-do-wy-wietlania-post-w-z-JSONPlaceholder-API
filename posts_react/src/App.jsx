import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Posts from './Posts';
import NotFound from './NotFound';
import Post from './Post';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // /post/:id
  {
    path: "/post/:id",
    element: <Post />,
  },
]);

function App() {
  return (
    <>
      <div className="App flex flex-row h-screen overflow-hidden p-20 m-0 w-full">
        <div className="menu w-1/3 h-full flex flex-col justify-around items-center">
          <div>
            <h1 className="text-3xl font-bold p-5">Wyswietlanie postów</h1>
            <h3 className="text-gray-400">Aplikacja wyświetlająca posty z JSONPlaceholder API</h3>
          </div>
        </div>
        <main className="content w-2/3 overflow-y-auto p-5 text-left">
          <RouterProvider router={router} />
        </main>
      </div>
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter, createRoutesFromElements, Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import {PATH} from "./constants/constants";
import { Square } from "./components/Square";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATH.HOME} element={<App/>}/>
      <Route path={PATH.SQUARE} element={<Square />} />
    </>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

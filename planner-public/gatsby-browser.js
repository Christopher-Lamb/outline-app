// gatsby-browser.js
import "./src/styles/global.css";
import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext.js";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

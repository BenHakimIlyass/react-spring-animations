import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 html {
  font-family: 'Heebo', sans-serif;
  height:2000px;
  }
`;
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  rootElement
);

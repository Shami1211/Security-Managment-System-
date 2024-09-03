import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root")); 
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);


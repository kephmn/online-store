// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";

// Mount the React app onto the element with id 'root'
document.addEventListener("DOMContentLoaded", () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
});
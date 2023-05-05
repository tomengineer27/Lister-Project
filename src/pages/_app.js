import React from "react";
import "../styles/globals.css";
import Context from "../components/Context";

function App({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/App.css";
import "assets/Custom/index";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { ToastContainer } from "react-toastify";
import App from "./app";
import { Provider } from "react-redux";
import store from "Store/Index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    {/* <React.StrictMode> */}
    <ThemeEditorProvider>
      <Provider store={store}>
        <App />
        <ToastContainer theme="colored" />
      </Provider>
    </ThemeEditorProvider>
    {/* </React.StrictMode> */}
  </ChakraProvider>
  // </React.StrictMode>
);

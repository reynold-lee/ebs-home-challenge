import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import Main from "./components/Main";
import { store } from "./store/store";

import "./App.css";

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </Provider>
  );
}

export default App;

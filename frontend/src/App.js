import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./helpers/router";
import { Provider } from "react-redux";

import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

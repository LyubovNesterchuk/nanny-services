import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { AuthProvider } from "./providers/AuthProvider";

import "../index.css";
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
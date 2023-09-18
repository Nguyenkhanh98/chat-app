import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000, // Global cache time for queries (in milliseconds)
      staleTime: 5 * 60 * 1000, // Time after which a query is considered stale and will be refetched (in milliseconds)
      refetchOnWindowFocus: true, // Enable/disable automatic refetching when the window regains focus
      refetchOnMount: true, // Enable/disable automatic refetching when a component is mounted
      retry: 0, // Number of times to retry failed queries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Function to calculate the delay between retries
      onError: (error) => {
        // Custom error handling logic
        console.error(error);
      },
      // Other query options...
    },
    mutations: {
      onError: (error, variables, context) => {
        // Custom error handling logic for mutations
        console.error(error);
      },
      // Other mutation options...
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

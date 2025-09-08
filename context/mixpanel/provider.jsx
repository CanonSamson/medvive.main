"use client"

import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export default function QueryClientProviderConponent({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

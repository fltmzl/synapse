"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactFlowProvider } from "@xyflow/react";
import { AuthInitProvider } from "./auth-init-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthInitProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ReactFlowProvider>{children}</ReactFlowProvider>
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthInitProvider>
  );
}

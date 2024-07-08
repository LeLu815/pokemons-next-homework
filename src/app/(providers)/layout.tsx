import { TanstackQueryProvider } from "@/react-query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <div className="w-screen h-screen overflow-y-auto bg-black">
        {children}
      </div>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;

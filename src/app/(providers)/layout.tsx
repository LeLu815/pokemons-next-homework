import { TanstackQueryProvider } from "@/react-query/queryClient";
import { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <div className="w-screen h-screen overflow-y-auto bg-black">
        {children}
      </div>
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;

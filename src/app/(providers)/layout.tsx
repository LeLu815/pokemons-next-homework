import { TanstackQueryProvider } from "@/react-query/queryClient";
import { PropsWithChildren } from "react";

function ProvidersLayout({ children }: PropsWithChildren) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}

export default ProvidersLayout;

import type { ReactNode } from "react";
import { PuterProvider } from "./PuterProvider";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return <PuterProvider>{children}</PuterProvider>;
}

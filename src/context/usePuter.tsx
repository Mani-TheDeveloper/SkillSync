import { useContext } from "react";
import { PuterContext } from "./PuterContext";

export const usePuter = () => {
  const ctx = useContext(PuterContext);
  if (!ctx) throw new Error("usePuter should in PuterContext");
  return ctx;
};

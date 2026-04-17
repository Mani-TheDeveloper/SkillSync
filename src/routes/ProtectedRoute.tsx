import { useEffect, useRef, type ReactNode } from "react";
import { usePuter } from "../context/usePuter";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const {
    isLoading,
    auth: { isAuthenticated, signIn },
  } = usePuter();

  const hasTriedAuth = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !hasTriedAuth.current) {
      hasTriedAuth.current = true;
      signIn();
    }
  }, [isAuthenticated, isLoading, signIn]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen font-medium text-xl flex flex-col items-center justify-center text-center">
        <span className="animate-pulse">Authenticating...</span>
        <p>
          If auto-authentication doesn't work, please do manual{" "}
          <span
            className="cursor-pointer font-bold text-[#C843CD] uppercase"
            onClick={() => signIn()}
          >
            log in
          </span>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

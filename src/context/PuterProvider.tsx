import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PuterContext } from "./PuterContext";
import type { User } from "@heyputer/puter.js/types/modules/auth";
import puter from "@heyputer/puter.js";

type AuthErrorShape = {
  status?: number;
  response?: { status?: number };
  message?: string;
};

export function PuterProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthError = (err: unknown): err is AuthErrorShape => {
    if (typeof err !== "object" || err === null) return false;
    const e = err as AuthErrorShape;
    return e.status === 401 || e.response?.status === 401;
  };

  const handleError = (err: unknown) => {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;
    else if (typeof err === "object" && err !== null) {
      try {
        message = JSON.stringify(err);
      } catch {
        message = "Unexpected error occurred";
      }
    }
    setError(message);

    if (isAuthError(err)) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const refreshAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const signedIn = puter.auth.isSignedIn();

      if (!signedIn) {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
        return;
      }

      const user = await puter.auth.getUser();
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      handleError(error || "Auth Check Failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async () => {
    try {
      await puter.auth.signIn();
      await refreshAuthStatus();
    } catch (error) {
      handleError(error || "Sign in falied");
    }
  };

  const signOut = async () => {
    try {
      puter.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      handleError(error || "Sign out failed");
    }
  };

  useEffect(() => {
    (() => refreshAuthStatus())();
  }, [refreshAuthStatus]);

  const write = (path: string, data: string | File | Blob) =>
    puter.fs.write(path, data).catch((error: Error) => handleError(error));

  const read = (path: string) =>
    puter.fs.read(path).catch((e: Error) => handleError(e));

  const readDir = (path: string) =>
    puter.fs.readdir(path).catch((e: Error) => handleError(e));

  const upload = (files: File | Blob) =>
    puter.fs.upload(files).catch((e: Error) => handleError(e));

  const deleteFile = (path: string) =>
    puter.fs.delete(path).catch((e: Error) => handleError(e));

  const feedback = (path: string, message: string) =>
    puter.ai.chat(
      [
        {
          role: "user",
          content: [
            { type: "file", puter_path: path },
            { type: "text", text: message },
          ],
        },
      ],
      { model: "claude-sonnet-4" },
    );

  const img2txt = (image: string | File | Blob, testMode?: boolean) =>
    puter.ai.img2txt(image, testMode).catch((e: Error) => handleError(e));

  const getKV = (key: string) =>
    puter.kv
      .get(key)
      .then((res) => res as string | void)
      .catch((e: Error) => handleError(e));

  const setKV = (key: string, value: string) =>
    puter.kv.set(key, value).catch((e: Error) => handleError(e));

  const deleteKV = (key: string) =>
    puter.kv.del(key).catch((e: Error) => handleError(e));

  const listKV = (pattern: string) =>
    puter.kv.list(pattern, true).catch((e: Error) => handleError(e));

  const flushKV = () => puter.kv.flush().catch((e: Error) => handleError(e));

  const value = useMemo(
    () => ({
      error,
      handleError,
      clearError,

      isLoading,

      auth: {
        user,
        isAuthenticated,
        signIn,
        signOut,
        refreshAuthStatus,
      },

      fs: { write, read, readDir, upload, delete: deleteFile },

      ai: { feedback, img2txt },

      kv: {
        get: getKV,
        set: setKV,
        delete: deleteKV,
        list: listKV,
        flush: flushKV,
      },
    }),
    [error, isLoading, user, isAuthenticated],
  );
  return (
    <PuterContext.Provider value={value}>{children}</PuterContext.Provider>
  );
}

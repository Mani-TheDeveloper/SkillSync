import { useEffect, useState, type ReactNode } from "react";
import { PuterContext } from "./PuterContext";
import type { User } from "@heyputer/puter.js/types/modules/auth";
import puter from "@heyputer/puter.js";

export function PuterProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleError = (msg: string) => {
    setError(msg);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuthStatus = async () => {
    try {
      const signedIn = puter.auth.isSignedIn();
      if (signedIn) {
        const user = await puter.auth.getUser();
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      handleError(String(error) || "Auth Check Falied");
    }
  };

  const signIn = async () => {
    try {
      await puter.auth.signIn();
      await refreshAuthStatus();
    } catch (error) {
      handleError(String(error) || "Sign in falied");
    }
  };

  const signOut = async () => {
    try {
      puter.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      handleError(String(error) || "Sign out failed");
    }
  };

  useEffect(() => {
    (() => refreshAuthStatus())();
  }, []);

  const write = (path: string, data: string | File | Blob) =>
    puter.fs
      .write(path, data)
      .catch((error: Error) => handleError(error.message));

  const read = (path: string) =>
    puter.fs.read(path).catch((e: Error) => handleError(e.message));

  const readDir = (path: string) =>
    puter.fs.readdir(path).catch((e: Error) => handleError(e.message));

  const upload = (files: File | FileList) =>
    puter.fs.upload(files).catch((e: Error) => handleError(e.message));

  const deleteFile = (path: string) =>
    puter.fs.delete(path).catch((e: Error) => handleError(e.message));

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
      { model: "claude-sonnet-4" }
    );

  const img2txt = (image: string | File | Blob, testMode?: boolean) =>
    puter.ai
      .img2txt(image, testMode)
      .catch((e: Error) => handleError(e.message));

  const getKV = (key: string) =>
    puter.kv.get(key).catch((e: Error) => handleError(e.message));

  const setKV = (key: string, value: string) =>
    puter.kv.set(key, value).catch((e: Error) => handleError(e.message));

  const deleteKV = (key: string) =>
    puter.kv.del(key).catch((e: Error) => handleError(e.message));

  const listKV = (pattern: string, returnValues?: false) =>
    puter.kv
      .list(pattern, returnValues)
      .catch((e: Error) => handleError(e.message));

  const flushKV = () =>
    puter.kv.flush().catch((e: Error) => handleError(e.message));

  const value = {
    error,

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
  };

  return (
    <PuterContext.Provider value={value}>{children}</PuterContext.Provider>
  );
}

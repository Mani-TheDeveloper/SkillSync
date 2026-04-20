import { createContext } from "react";

import type { User } from "@heyputer/puter.js/types/modules/auth";
import type { ChatResponse, FSItem, KVPair } from "@heyputer/puter.js";

export interface PuterContextType {
  error: string | null;
  handleError: (err: unknown) => void;
  clearError: () => void;
  isLoading: boolean;
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshAuthStatus: () => Promise<void>;
  };

  fs: {
    write: (path: string, data: string | File | Blob) => Promise<void | FSItem>;
    read: (path: string) => Promise<void | Blob>;
    readDir: (path: string) => Promise<void | FSItem[]>;
    upload: (files: File | Blob) => Promise<void | FSItem | FSItem[]>;
    delete: (path: string) => Promise<void>;
  };

  ai: {
    feedback: (path: string, message: string) => Promise<ChatResponse>;
    img2txt: (
      image: string | File | Blob,
      testMode?: boolean,
    ) => Promise<string | void>;
  };

  kv: {
    get: (key: string) => Promise<string | void>;
    set: (key: string, value: string) => Promise<boolean | void>;
    delete: (key: string) => Promise<boolean | void>;
    list: (pattern: string) => Promise<void | KVPair<unknown>[]>;
    flush: () => Promise<boolean | void>;
  };
}

export const PuterContext = createContext<PuterContextType | null>(null);

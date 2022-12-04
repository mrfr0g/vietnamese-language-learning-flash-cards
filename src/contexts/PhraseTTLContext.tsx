import { createContext, useCallback, useEffect, useState } from "react";

export type Base64 = string;

type PhraseTTLContext = {
  ttls: Record<string, Base64>;
  setTtl: (key: string, value: Base64) => void;
};

export const PhraseTTLContext = createContext<PhraseTTLContext>({
  ttls: {},
  setTtl: (_key, _value) => {},
});

interface PhraseTTLContextProviderProps {
  children: React.ReactNode;
}

export function PhraseTTLContextProvider({
  children,
}: PhraseTTLContextProviderProps) {
  const [ttls, setTtls] = useState<Record<string, Base64>>({});

  const setTtl = useCallback(
    (key: string, value: Base64) => {
      setTtls({
        ...ttls,
        [key]: value,
      });

      localStorage.setItem(`phrase__${key}`, value);
    },
    [ttls, setTtls]
  );

  useEffect(() => {
    const cachedTtls: Record<string, Base64> = {};

    for (let key in localStorage) {
      if (key.startsWith("phrase__")) {
        const phraseKey = key.replace("phrase__", "");
        cachedTtls[phraseKey] = localStorage.getItem(key);
      }
    }

    setTtls(cachedTtls);
  }, [setTtls]);

  return (
    <PhraseTTLContext.Provider
      value={{
        ttls,
        setTtl,
      }}
    >
      {children}
    </PhraseTTLContext.Provider>
  );
}

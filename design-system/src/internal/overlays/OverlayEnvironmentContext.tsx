import { createContext, useContext, useMemo } from "react";

export interface OverlayEnvironmentValue {
  containerId?: string;
}

const OverlayEnvironmentContext = createContext<OverlayEnvironmentValue>({});

export interface OverlayEnvironmentProviderProps {
  containerId?: string;
  children: React.ReactNode;
}

export function OverlayEnvironmentProvider({
  containerId,
  children,
}: OverlayEnvironmentProviderProps) {
  const value = useMemo(
    () => ({
      containerId: containerId?.trim() || undefined,
    }),
    [containerId],
  );

  return (
    <OverlayEnvironmentContext.Provider value={value}>
      {children}
    </OverlayEnvironmentContext.Provider>
  );
}

export function useOverlayEnvironment(): OverlayEnvironmentValue {
  return useContext(OverlayEnvironmentContext);
}

import React, { ReactNode } from "react";
import { RootStore, rootStore } from "./RootStore";

export const RootStoreContext = React.createContext<RootStore>(rootStore);

export const RootStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);

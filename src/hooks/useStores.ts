import { useContext } from "react";
import { RootStoreContext } from "../stores/RootStoreContext";

export function useStores() {
  return useContext(RootStoreContext);
}

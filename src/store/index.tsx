"use client";

import { createStore } from "zustand/vanilla";
import { useStore as useZustandStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";

interface IStoreState {
  showModal: boolean;
}

interface IStoreAction {
  setShowModal: (payload: boolean) => void;
}

export type Store = IStoreState & IStoreAction;

export type StoreApi = ReturnType<typeof createCounterStore>;

const defaultInitState: IStoreState = {
  showModal: false,
};

export const createCounterStore = (
  initState: IStoreState = defaultInitState
) => {
  return createStore<Store>()((set) => ({
    ...initState,

    setShowModal: (payload) => set(() => ({ showModal: payload })),
  }));
};

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCounterStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be used within StoreProvider`);
  }

  return useZustandStore(storeContext, selector);
};

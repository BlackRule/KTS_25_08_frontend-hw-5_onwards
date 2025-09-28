'use client'

import { createContext, useContext, useState } from 'react'
import RootStore from './root-store'

const RootStoreContext = createContext<RootStore | null>(null)

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new RootStore())
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
}

export function useRootStore(): RootStore {
  const store = useContext(RootStoreContext)
  if (!store) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }
  return store
}

export function useAuthStore() {
  return useRootStore().auth
}

export function useCartStore() {
  return useRootStore().cart
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, ReactNode, useState } from "react";

interface Props{
  active: boolean
  setActive: (value: any) => void
}

export const CardActionsContext = createContext({} as Props)

export const CardActionsContextProvider = ({children}:{children: ReactNode}) => {
  const [active, setActive] = useState(false)

  return (
    <CardActionsContext.Provider value={{setActive, active}}>
      {children}
    </CardActionsContext.Provider>
  );
} 
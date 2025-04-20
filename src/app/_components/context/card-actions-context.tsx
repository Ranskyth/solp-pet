/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, ReactNode, useState } from "react";

type tipos = "Cadastrar" | "Editar" |"Deletar"

interface Props{
  active: boolean
  setActive: (value: any) => void
  setTypes: (value: tipos) => void
  types: "Cadastrar" | "Editar" | "Deletar"
}

export const CardActionsContext = createContext({} as Props)

export const CardActionsContextProvider = ({children}:{children: ReactNode}) => {

  const [active, setActive] = useState(false)
  const [types, setTypes] = useState<tipos>("Cadastrar");

  return (
    <CardActionsContext.Provider value={{types, setTypes ,setActive, active}}>
      {children}
    </CardActionsContext.Provider>
  );
} 
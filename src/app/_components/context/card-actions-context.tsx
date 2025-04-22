/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, ReactNode, useState } from "react";

type tipos = "Cadastrar" | "Editar" |"Deletar"

interface Props{
  active: boolean
  setActive: (value: any) => void
  setTypes: (value: tipos) => void
  types: "Cadastrar" | "Editar" | "Deletar"
  id: string
  setId: (value: any) => void 
}

export const CardActionsContext = createContext({} as Props)

export const CardActionsContextProvider = ({children}:{children: ReactNode}) => {

  const [active, setActive] = useState(false)
  const [types, setTypes] = useState<tipos>("Cadastrar");
  const [id, setId] = useState<string>("")

  return (
    <CardActionsContext.Provider value={{types, setId, id, setTypes ,setActive, active}}>
      {children}
    </CardActionsContext.Provider>
  );
} 
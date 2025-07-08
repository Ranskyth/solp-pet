"use client";
import { createContext, ReactNode, useState } from "react";

type Props = {
  page: number;
  ProximaPagina: () => Promise<void>;
  PaginaAnterior: () => Promise<void>;
};

export const PaginationContext = createContext({} as Props);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  const ProximaPagina = async () => {
    const current = page + 1;
    setPage(current);
  };
  const PaginaAnterior = async () => {
    const current = page - 1;
    setPage(current);
  };
  return (
    <PaginationContext.Provider value={{ page, ProximaPagina, PaginaAnterior }}>
      {children}
    </PaginationContext.Provider>
  );
};

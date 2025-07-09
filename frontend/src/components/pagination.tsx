import { useContext } from "react";
import { PaginationContext } from "./context/pagination-context";

export const Pagination = ({ pages }: { pages?: number }) => {
  const { PaginaAnterior, ProximaPagina, page } = useContext(PaginationContext);

  return (
    <div className="flex mt-4 gap-1 items-end justify-end">
      <button disabled={page == 1} onClick={PaginaAnterior}>
        <img src="down.svg" alt="" />
      </button>
      <p>{page}</p>
      <p>de</p>
      <p>{pages}</p>
      <button disabled={pages == page} onClick={ProximaPagina}>
        <img src="up.svg" alt="" />
      </button>
    </div>
  );
};

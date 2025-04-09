"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "./_components/header";
import { Pagination } from "./_components/pagination";
import { CardAnimais } from "./_components/card-animais";
import { CardActions } from "./_components/card-actions";

interface NameAnimaisAndDonosType {
  nome: string;
  dono: {
    nome: string;
  };
}

export default function Home() {
  const [dataNames, setDataNames] = useState<
    NameAnimaisAndDonosType[] | null | undefined
  >([]);
  const [ativo, setAtivo] = useState(false);
  const refs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleAtivo = (event: MouseEvent) => {
      if (!refs.current?.contains(event.target as Node)) {
        setAtivo(false);
      }
    };
    if (ativo) {
      document.addEventListener("click", handleAtivo);
    }

    const RequestAnimaisAndDonos = async () => {
      try {
        const res = await fetch("http://localhost:3333/nomes/animal/dono");
        const resjson = await res.json();
        setDataNames(resjson);
      } catch (error) {
        console.log(error);
      }
    };

    RequestAnimaisAndDonos();

    return () => {
      document.removeEventListener("click", handleAtivo);
    };
  }, [ativo]);

  return (
    <div className="px-[65px] py-[30px]">
          {ativo ? (
            <div ref={refs} className="flex justify-center">
      
              <CardActions />
      
            </div>
          ) : null}
      <Header />
      <div className="my-6 flex gap-2">
        <div className="inline-flex items-center w-[85%] relative">
          <input
            className="border-3 w-[100%] border-[#404a5c] p-3 rounded-[12px]"
            type="text"
          />
          <button className="absolute right-[5px] rounded-[8px] px-8 py-2 bg-[#404a5c] font-[700]">
            Pesquisar
          </button>
        </div>
        <button
          onClick={() => setAtivo((prev) => !prev)}
          className="px-8 py-3 bg-linear-to-br from-[#00c1fa] to-[#0059e3] rounded-[12px]"
        >
          Cadastrar
        </button>
      </div>


      <div className="grid gap-4 grid-cols-4 grid-rows-4">
        {dataNames?.map((x) => (
          <CardAnimais key={x.nome} nome={x.nome} dono={x.dono.nome} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

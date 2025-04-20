/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Header } from "./_components/header";
import { Pagination } from "./_components/pagination";
import { CardAnimais } from "./_components/card-animais";
import { CardActions } from "./_components/card-actions";
import { NameAnimaisAndDonosType } from "@/types/NameAnimaisAndDonosType";
import { BACKEND_API } from "./api/api";
import { CardActionsContext } from "./_components/context/card-actions-context";

const RequestAnimaisAndDonos = async () => {
  try {
    const res = await fetch(`${BACKEND_API}/nomes/animal/dono`);
    const resjson = await res.json();
    return resjson;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default function Home() {
  const {active, setActive} = useContext(CardActionsContext)

  const [dataNames, setDataNames] = useState<
    NameAnimaisAndDonosType[] | null | undefined
  >([]);
  const {setTypes} = useContext(CardActionsContext)

  const refs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setDataNames(await RequestAnimaisAndDonos());
    })();
  }, []);

  useEffect(() => {
    const handleAtivo = (event: MouseEvent) => {
      if (!refs.current?.contains(event.target as Node)) {
        setActive(false);
      }
    };
    if (active) {
      document.addEventListener("click", handleAtivo);
    }

    const RequestAnimaisAndDonos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/nomes/animal/dono`);
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
  }, [active]);

  return (
    <div className="px-[65px] py-[30px]">
      {active ? (
        <div ref={refs} className="flex justify-center">
          <CardActions
            Desable={() => setActive((prev: boolean) => !prev)}
          />
        </div>
      ) : null}
      <Header />
      <div className="my-4 flex gap-2">
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
          onClick={() => {setActive((prev: boolean) => !prev); setTypes("Cadastrar")}}
          className="py-3 bg-linear-to-br from-[#00c1fa] w-[calc(100%_-_85%)] to-[#0059e3] rounded-[12px]"
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

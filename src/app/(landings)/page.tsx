/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../_components/header";
import { Pagination } from "../_components/pagination";
import { CardAnimais } from "../_components/cards/card-animais";
import { CardActions } from "../_components/cards/card-actions";
import { NameAnimaisAndDonosType } from "@/types/NameAnimaisAndDonosType";
import { BACKEND_API } from "../api/api";
import { CardActionsContext } from "../_components/context/card-actions-context";
import { Spinner } from "../_components/icons/spinner";

const RequestAnimaisAndDonos = async () => {
  try {
    const res = await fetch(`${BACKEND_API}/pet/dono`);
    const resjson = await res.json();
    return resjson;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export default function Home() {
  const { active, setActive } = useContext(CardActionsContext);
  const [loading, setloading] = useState(true);
  const [dataNames, setDataNames] = useState<
    NameAnimaisAndDonosType[] | null | undefined
  >([]);
  const { setTypes } = useContext(CardActionsContext);

  const refs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setDataNames(await RequestAnimaisAndDonos());

      setloading(false);
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

    

    return () => {
      document.removeEventListener("click", handleAtivo);
    };
  }, [active]);


  return (
    <div className="px-[65px] py-[30px] max-[760px]:py-[0px]">
      {active ? (
        <div ref={refs} className="flex justify-center">
          <CardActions Desable={() => setActive((prev: boolean) => !prev)} />
        </div>
      ) : null}
      <Header />
      <div className="max-[760px]:hidden my-4 flex gap-2">
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
          onClick={() => {
            setActive((prev: boolean) => !prev);
            setTypes("Cadastrar");
          }}
          className="py-3 bg-linear-to-br from-[#00c1fa] w-[calc(100%_-_85%)] to-[#0059e3] rounded-[12px]"
        >
          Cadastrar
        </button>
      </div>

      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {dataNames?.length == 0 ? (
            <>
              <h1>Nenhum Animal Cadastrado</h1>
            </>
          ) : (
            <>
              <div className="grid gap-4 max-[760px]:grid-cols-1 max-[800px]:grid-cols-2 max-[1032px]:grid-cols-3 grid-cols-4  grid-rows-4">
                {dataNames?.map((x) => (
                  <CardAnimais
                    key={x.dono.id}
                    id={x.dono.id}
                    idade={x.nascimento}
                    raca={x.raca}
                    telefone={x.dono.telefone}
                    nome={x.nome}
                    dono={x.dono.nome}
                  />
                ))}
              </div>

              <Pagination />
            </>
          )}
        </>
      )}
    </div>
  );
}

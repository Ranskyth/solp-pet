/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CardActions } from "@/components/cards/card-actions";
import { CardAnimais } from "@/components/cards/card-animais";
import { CardActionsContext } from "@/components/context/card-actions-context";
import { Header } from "@/components/header";
import { Spinner } from "@/components/icons/spinner";
import { Pagination } from "@/components/pagination";
import { BACKEND_API } from "@/app/api/api";
import { DonosType } from "@/types/NameAnimaisAndDonosType";
import { useContext, useEffect, useRef, useState } from "react";
import { PaginationContext } from "../context/pagination-context";
import { AuthContext } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const RequestAnimaisAndDonos = async (
  page: any,
  nome: string,
  tipo: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${BACKEND_API}/api/v1/pet/dono?pages=${page}&nome=${nome}&tipo=${tipo}`,
      {
        headers: { Authorization: `token ${getCookie("token")}` },
      }
    );
    const resjson: DonosType = await res.json();
    return resjson;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const HomePage = () => {
  const { page } = useContext(PaginationContext);
  const router = useRouter();
  const { active, setActive } = useContext(CardActionsContext);
  const [loading, setloading] = useState(true);
  const [filtro, setFiltro] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { setTypes } = useContext(CardActionsContext);
  const { Auth, user } = useContext(AuthContext);
  const refs = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DonosType>({
    cadastros: {} as DonosType["cadastros"],
    pages: 1,
  });

    useEffect(() => {
      if (Auth == false) {
        router.push("/login");
      }
    },[Auth]);    


  useEffect(() => {
    (async () => {
      const req = await RequestAnimaisAndDonos(page, search, filtro);

      setData(req);
      setloading(false);
    })();
  }, [page, search, filtro]);

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

  if (!user.split(".")[2] || !user || !Auth) {
    return null;
  }

  return (
    <div>
      {active ? (
        <div ref={refs} className="flex justify-center">
          <CardActions />
        </div>
      ) : null}
      <Header user={user} />
      <div className="max-[760px]:hidden my-4 flex gap-2">
        <div className="inline-flex items-center w-[85%] relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-3 w-[100%] border-[#404a5c] p-3 rounded-[12px]"
            type="text"
          />
        </div>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="rounded-[12] font-bold text-black bg-linear-to-br from-[#00c1fa] w-[calc(100%_-_85%)] to-[#0059e3] px-2"
        >
          <option value="">Todos</option>
          <option value="Gato">Gatos</option>
          <option value="Cachorro">Cachorros</option>
        </select>
        <button
          onClick={() => {
            setActive((prev: boolean) => !prev);
            setTypes("Cadastrar");
          }}
          className="py-3 bg-linear-to-br from-[#00c1fa] w-[calc(100%_-_85%)] to-[#0059e3] rounded-[12px] font-bold"
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
          {data && data?.cadastros?.length == Number(0) ? (
            <>
              <h1>Nenhum Animal Cadastrado</h1>
            </>
          ) : (
            <>
              <div className="grid gap-4 max-[760px]:grid-cols-1 max-[800px]:grid-cols-2 max-[1032px]:grid-cols-3 grid-cols-4  grid-rows-4">
                {Array.isArray(data.cadastros)
                  ? data?.cadastros
                      .filter((x) => (filtro ? x.tipo == filtro : x))
                      .map((x) => (
                        <CardAnimais
                          key={x.dono.id}
                          id={x.dono.id}
                          idade={x.nascimento}
                          raca={x.raca}
                          telefone={x.dono.telefone}
                          nome={x.nome}
                          dono={x.dono.nome}
                        />
                      ))
                  : []}
              </div>
              <Pagination pages={data.pages} />
            </>
          )}
        </>
      )}
    </div>
  );
};

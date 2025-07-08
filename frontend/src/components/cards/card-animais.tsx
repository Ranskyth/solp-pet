"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CardActionsContext } from "../context/card-actions-context";
import { BACKEND_API } from "@/app/api/api";
import { Button } from "../button";
import { Icon } from "../icon";
import { getCookie } from "cookies-next";

export const CardAnimais = ({
  id,
  nome,
  dono,
  raca,
  telefone,
  idade,
}: {
  id: string;
  raca: string;
  telefone: string;
  idade: string;
  nome: string;
  dono: string;
}) => {
  const [buttonActive, setButtonActive] = useState(false);
  const { setActive, setTypes, setId, setDataForms } =
    useContext(CardActionsContext);
  const isCard = useRef<HTMLDivElement>(null);
  const [icon, setIcon] = useState<{ animal: { tipo: string } }>();
  const DataForms = async () => {
    const res = await fetch(`${BACKEND_API}/api/v1/pet/dono/${id}`, {
      headers: { Authorization: `token ${getCookie("token")}` },
    });
    const resjson = await res.json();
    setDataForms(resjson);
  };
  const calcIdade = (nascimentoDate: string) => {
    const [anoStr, mesStr, diaStr] = nascimentoDate.split("-");
    const ano = Number(anoStr);
    const mes = Number(mesStr) - 1;
    const dia = Number(diaStr);

    const nascimento = new Date(ano, mes, dia);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
      meses--;
      const ultimoDiaDoMesAnterior = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        0
      ).getDate();
      dias += ultimoDiaDoMesAnterior;
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    const partes = [];
    if (anos > 0) partes.push(`${anos} ano${anos > 1 ? "s" : ""}`);
    if (meses > 0) partes.push(`${meses} mês${meses > 1 ? "es" : ""}`);
    if (dias > 0 || partes.length === 0)
      partes.push(`${dias} dia${dias > 1 ? "s" : ""}`);

    return partes.join(" e ");
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BACKEND_API}/api/v1/pet/dono/${id}`, {
        headers: { Authorization: `token ${getCookie("token")}` },
      });
      const resjson = await res.json();
      setIcon(resjson);
    })();
    const handleIsCard = (event: MouseEvent) => {
      if (!isCard.current?.contains(event.target as Node)) {
        setButtonActive(false);
      }
    };
    if (buttonActive) {
      document.addEventListener("click", handleIsCard);
    }

    return () => {
      document.removeEventListener("click", handleIsCard);
    };
  }, [buttonActive]);
  console.log(icon);
  return (
    <div ref={isCard} className="relative">
      <button
        onClick={() => setButtonActive(true)}
        className={`w-full h-[95px] rounded-2xl bg-gradient-to-br from-[#011e4d] to-[#000915] hover:outline-4 hover:outline-[#01c6fb] flex items-center px-5 ${
          buttonActive && `outline-4 outline-[#01c6fb]`
        }`}
      >
        {icon?.animal?.tipo == "Gato" ? <Icon icon={0} /> : <Icon icon={4} />}

        <div className="ml-5">
          <div className="flex gap-2">
            <img src="Group.svg" alt="" />
            <p>{nome}</p>
          </div>
          <div className="flex gap-2">
            <img src="Vector.svg" alt="" />
            <p>{dono}</p>
          </div>
        </div>
      </button>

      {buttonActive && (
        <div
          className="z-10 absolute bg-gradient-to-br from-[#011e4d] to-[#000915] mt-4 border-4
    border-[#01c6fb] rounded-2xl w-full h-52 p-2"
        >
          <h1>Raça : {raca}</h1>
          <h1>Telefone : {telefone}</h1>
          <h1>Idade : {calcIdade(idade)}</h1>
          <div className="flex flex-col gap-2">
            <Button
              text="Editar"
              click={() => {
                setTypes("Editar");
                setId(id);
                setDataForms(DataForms);
                setActive((prev: boolean) => !prev);
                setButtonActive((prev) => !prev);
              }}
            />
            <Button
              text="Remover"
              click={() => {
                setDataForms(DataForms);
                setTypes("Deletar");
                setId(id);
                setActive((prev: boolean) => !prev);
                setButtonActive((prev) => !prev);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

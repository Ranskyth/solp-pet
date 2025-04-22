/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent, useContext } from "react";
import { Icon } from "./icon";
import { Exit } from "./icons/exit";
import { Input } from "./input";
import { BACKEND_API } from "../api/api";
import { Button } from "./button";
import { CardActionsContext } from "./context/card-actions-context";


interface Props {
  Desable?: () => void;
}

export const CardActions = ({ Desable }: Props) => {
  const { types, id } = useContext(CardActionsContext);

  const handleDeletar = () => {

   fetch(`${BACKEND_API}/donos/${id}`, {method:"DELETE"})

  };


  const handleEditar = () => {
    console.log("Editar");
  };

  const handleCadastrar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const forms = new FormData(e.currentTarget);

    const data = {
      nome: forms.get("nomeDono") as string,
      telefone: forms.get("telefone") as string,
      animal: {
        create: {
          nome: forms.get("nome") as string,
          tipo: forms.get("animal") as string,
          nascimento: forms.get("nascimento") as string,
          raca: forms.get("raca") as string,
        },
      },
    };

    fetch(`${BACKEND_API}/donos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    location.reload()
  };

  return (
    <div className="w-[750px] border-4 border-[#0058e2] h-[580px] rounded-2xl p-20 bg-[#011e4d] z-10 absolute">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {types == "Deletar" ? (
            <>
              <Icon icon={2} /> <span>Deletar</span>
            </>
          ) : null}
          {types == "Editar" ? (
            <>
              <Icon icon={3} /> <span>Editar</span>
            </>
          ) : null}
          {types == "Cadastrar" ? (
            <>
              <Icon icon={1} /> <span>Cadastrar</span>
            </>
          ) : null}
        </div>
        <button
          onClick={() => {
            Desable && Desable();
          }}
        >
          <Exit />
        </button>
      </div>
      <form
        onSubmit={
          types == "Cadastrar"
            ? handleCadastrar
            : types == "Deletar"
            ? handleDeletar
            : types == "Editar"
            ? handleEditar
            : undefined
        }
        className="mt-10 gap-x-12 gap-y-1.5 grid grid-cols-2 grid-rows-3"
      >
        <div>
          <Input label="Nome" id="nome" placeholder="Nome Completo" />
        </div>
        <div>
          <Input label="Animal" id="animal" type="Radio" />
        </div>
        <div>
          <Input label="Dono" id="nomeDono" placeholder="Nome Completo" />
        </div>
        <div>
          <Input label="Raca" id="raca" placeholder="Raça" />
        </div>
        <div>
          <Input
            label="Telefone"
            id="telefone"
            placeholder="(00) 0 0000-0000"
          />
        </div>
        <div>
          <Input label="Nascimento" id="nascimento" type="Date" />
        </div>
        <div className="mt-10">
          <Button click={Desable} text="Voltar" />
        </div>
        <div className="mt-10">
          <Button
            click={() => {
              if (types == "Cadastrar") {
                alert("Cadastrado com sucesso");
              } else if (types == "Deletar") {
                alert("Deletado com sucesso");
         
              } else if (types == "Editar") {
                alert("Editado com sucesso");
              } else {
                null;
              }
            }}
            text={
              types == "Cadastrar"
                ? "Cadastrar"
                : types == "Deletar"
                ? "Deletar"
                : types == "Editar"
                ? "Editar"
                : ""
            }
          />
        </div>
      </form>
    </div>
  );
};

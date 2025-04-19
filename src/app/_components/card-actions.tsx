/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent } from "react";
import { Icon } from "./icon";
import { Exit } from "./icons/exit";
import { Input } from "./input";
import { BACKEND_API } from "../api/api";
import { Button } from "./button";


interface Props{
  Desable?: () => void,
  cardType?: "Cadastro" | "Editar" | "Deletar"
}

export const CardActions = ({ Desable, cardType }: Props) => {
  
  const handleDeletar = () => {
    console.log("Delete");
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
  };

  return (
    <div className="w-[750px] border-4 border-[#0058e2] h-[580px] rounded-2xl p-20 bg-[#011e4d] z-10 absolute">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Icon icon={1} />
          <span>Cadastrar</span>
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
        onSubmit={handleCadastrar}
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
              cardType == "Cadastro"
                ? handleCadastrar
                : cardType == "Deletar"
                ? handleDeletar
                : handleEditar;
            }}
            text="Cadastrar"
          />
        </div>
      </form>
    </div>
  );
};

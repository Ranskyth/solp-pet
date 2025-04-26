/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent, useContext, useState } from "react";
import { Icon } from "../icon";
import { Exit } from "../icons/exit";
import { BACKEND_API } from "../../api/api";
import { Button } from "../button";
import { CardActionsContext } from "../context/card-actions-context";
import { InputText } from "../inputs/input-text";
import { InputRadio } from "../inputs/input-radio";
import { InputDate } from "../inputs/input-date";

interface Props {
  Desable?: () => void;
}

export const CardActions = ({ Desable }: Props) => {
  const { types, id, dataForms } = useContext(CardActionsContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [form, setForm] = useState({
    id: "",
    nome: "",
    telefone: "",
    animal: {
      nome: "",
      tipo: "",
      nascimento: "",
      raca: "",
    },
  });

  const handleDeletar = () => {
    fetch(`${BACKEND_API}/donos/${id}`, { method: "DELETE" });
  };

  const handleEditar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  console.log(dataForms);
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
    location.reload();
  };
  console.log(form)


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
          <InputText
            label="Nome Do Pet"
            change={(e) => setForm({...form, animal:{...form.animal,nome:e.target.value}})}
            name="nome"
            value={types == "Deletar" || types == "Editar" ? dataForms?.animal?.nome : form.animal.nome}
            placeholder="Nome Completo"
            
          />
        </div>
        <div>
          <InputRadio
            label="Animal"
            value={types == "Deletar" || types == "Editar" ? dataForms?.animal?.tipo : ""}
            name="animal"
          />
        </div>
        <div>
          <InputText
            label="Nome do Dono"
            change={(e) => setForm({...form, nome:e.target.value})}
            value={types == "Deletar" || types == "Editar" ? dataForms?.animal?.nome : form.nome}
            name="nomeDono"
            placeholder="Nome Completo"
          />
        </div>
        <div>
          <InputText
            label="Raca"
            value={types == "Deletar" || types == "Editar" ? dataForms?.animal?.raca : form.animal.raca}
            change={(e) => setForm({...form, animal:{...form.animal, raca:e.target.value}})}
            name="raca"
            placeholder="Raça"
          />
        </div>
        <div>
          <InputText
            value={types == "Deletar" || types == "Editar" ? dataForms?.telefone : form.telefone}
            change={(e) => setForm({...form, telefone:e.target.value})}
            label="Telefone"
            name="telefone"
            placeholder="(00) 0 0000-0000"
          />
        </div>
        <div>
          <InputDate
            value={types == "Deletar" || types == "Editar" ? dataForms?.nascimento : ""}
            label="Nascimento"
            name="nascimento"
          />
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

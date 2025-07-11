/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent, useContext, useEffect, useState } from "react";
import { Icon } from "../icon";
import { Exit } from "../icons/exit";
import { BACKEND_API } from "../../app/api/api";
import { Button } from "../button";
import { CardActionsContext } from "../context/card-actions-context";
import { InputText } from "../inputs/input-text";
import { InputRadio } from "../inputs/input-radio";
import { InputDate } from "../inputs/input-date";
import { notificationSuccess } from "../notification-success";
import { getCookie } from "cookies-next";

export type TipoAnimal = "Gato" | "Cachorro" | "";

export interface Animal {
  nome: string;
  tipo: TipoAnimal;
  nascimento: string;
  raca: string;
}

export interface FormState {
  id: string;
  nome: string;
  telefone: string;
  animal: Animal;
}

export const CardActions = () => {
  const { types, id, dataForms, setActive } = useContext(CardActionsContext);

  const [form, setForm] = useState<FormState>({
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

  useEffect(() => {
    if ((types === "Editar" || types === "Deletar") && dataForms) {
      setForm({
        id: dataForms.id || "",
        nome: dataForms.nome || "",
        telefone: dataForms.telefone || "",
        animal: {
          nome: dataForms.animal?.nome || "",
          tipo: dataForms.animal?.tipo || "",
          nascimento: dataForms.animal?.nascimento || "",
          raca: dataForms.animal?.raca || "",
        },
      });
    }
  }, [types, dataForms]);

  const handleDeletar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${BACKEND_API}/api/v1/dono/${id}`, {
      method: "DELETE",
      headers: { Authorization: `token ${getCookie("token")}` },
    });
    notificationSuccess();
  };

  const handleCadastrar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nome: form.nome,
      telefone: form.telefone,
      animal: {
        create: {
          nome: form.animal.nome,
          tipo: form.animal.tipo,
          nascimento: form.animal.nascimento,
          raca: form.animal.raca,
        },
      },
    };

    await fetch(`${BACKEND_API}/api/v1/dono`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${getCookie("token")}`,
      },
      body: JSON.stringify(data),
    });

    notificationSuccess();
  };

  const handleEditar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nome: form.nome,
      telefone: form.telefone,
      animal: {
        update: {
          nome: form.animal.nome,
          tipo: form.animal.tipo,
          nascimento: form.animal.nascimento,
          raca: form.animal.raca,
        },
      },
    };

    await fetch(`${BACKEND_API}/api/v1/dono/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${getCookie("token")}`,
      },
      body: JSON.stringify(data),
    });
    notificationSuccess();
  };

  return (
    <div className="w-[750px] border-4 border-[#0058e2] h-[580px] rounded-2xl p-20 bg-[#011e4d] z-10 absolute">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {types === "Deletar" && (
            <>
              <Icon icon={2} /> <span>Deletar</span>
            </>
          )}
          {types === "Editar" && (
            <>
              <Icon icon={3} /> <span>Editar</span>
            </>
          )}
          {types === "Cadastrar" && (
            <>
              <Icon icon={1} /> <span>Cadastrar</span>
            </>
          )}
        </div>
        <button onClick={() => setActive(false)}>
          <Exit />
        </button>
      </div>

      <form
        onSubmit={
          types === "Cadastrar"
            ? handleCadastrar
            : types === "Deletar"
              ? handleDeletar
              : types === "Editar"
                ? handleEditar
                : undefined
        }
        className="mt-10 gap-x-12 gap-y-1.5 grid grid-cols-2 grid-rows-3"
      >
        <div>
          <InputText
            label="Nome Do Pet"
            change={(e) =>
              setForm({
                ...form,
                animal: { ...form.animal, nome: e.target.value },
              })
            }
            name="nome"
            value={form.animal.nome}
            placeholder="Nome Completo"
            disabled={types === "Deletar"}
          />
        </div>
        <div>
          <InputRadio
            label="Animal"
            name="animal"
            value={form.animal.tipo}
            onChange={(v) =>
              setForm({ ...form, animal: { ...form.animal, tipo: v } })
            }
            disabled={types === "Deletar"}
          />
        </div>
        <div>
          <InputText
            label="Nome do Dono"
            change={(e) => setForm({ ...form, nome: e.target.value })}
            value={form.nome}
            name="nomeDono"
            placeholder="Nome Completo"
            disabled={types === "Deletar"}
          />
        </div>
        <div>
          <InputText
            label="Raca"
            value={form.animal.raca}
            change={(e) =>
              setForm({
                ...form,
                animal: { ...form.animal, raca: e.target.value },
              })
            }
            name="raca"
            placeholder="Raça"
            disabled={types === "Deletar"}
          />
        </div>
        <div>
          <InputText
            value={form.telefone}
            change={(e) => setForm({ ...form, telefone: e.target.value })}
            label="Telefone"
            name="telefone"
            placeholder="(00) 0 0000-0000"
            disabled={types === "Deletar"}
          />
        </div>
        <div>
          <InputDate
            value={form.animal.nascimento}
            label="Nascimento"
            name="nascimento"
            change={(e) =>
              setForm({
                ...form,
                animal: { ...form.animal, nascimento: e.target.value },
              })
            }
            disabled={types === "Deletar"}
          />
        </div>
        <div className="mt-10">
          <Button click={() => setActive(false)} text="Voltar" />
        </div>
        <div className="mt-10">
          <Button
            text={
              types === "Cadastrar"
                ? "Cadastrar"
                : types === "Deletar"
                  ? "Deletar"
                  : types === "Editar"
                    ? "Editar"
                    : ""
            }
            bgcolor={types === "Deletar" ? "bg-[#e94747]" : undefined}
          />
        </div>
      </form>
    </div>
  );
};

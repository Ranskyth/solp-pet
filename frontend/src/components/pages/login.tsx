/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { FormEvent, useContext, useState } from "react";
import { InputText } from "../inputs/input-text";
import { AuthContext } from "../context/auth-context";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex justify-center items-center">
        <form className="flex flex-col gap-3 w-100" onSubmit={submit}>
          <h1 className="text-center text-[22px] uppercase">Login</h1>
          <div>
            <InputText
              label="Usuario"
              name="user"
              value={email}
              change={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <InputText
              label="Senha"
              name="pass"
              value={password}
              change={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-400 px-5 py-2 rounded-2xl">
              Acessar
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="border-2 rounded-2xl text-center flex flex-col gap-3 w-[422px] p-2 border-[#404A5C]">
          <h1 className="font-bold">Usuarios e Senhas de Teste</h1>
          <div>
            <p>user: admin@example.com | senha: 12345678</p>
            <p>user: admin2@example.com | senha: 12345678</p>
            <p>user: user@example.com | senha: 12345678</p>
            <p>user: maria@gmail.com | senha: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

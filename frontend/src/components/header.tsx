/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { Options } from "./icons/options";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";

export const Header = ({ user }: { user: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    const handleAtivo = (event: MouseEvent) => {
      if (!modal.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleAtivo);
    }

    return () => {
      document.removeEventListener("click", handleAtivo);
    };
  }, [isOpen]);

  const { name }: { name: string } = jwtDecode(user);

  return (
    <header className="relative flex items-center justify-between">
      <div className="flex items-center">
        <img className="w-[92px]" src="./logo.png" alt="" />
        <div>
          <p className="text-[30px] font-extrabold">Solp Pet</p>
          <p className="font-bold">
            Bem Vindo!{" "}
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </p>
        </div>
      </div>
      <div className="relative">
        <button className="p-4" onClick={() => setIsOpen((prev) => !prev)}>
          <Options />
        </button>
        {isOpen == true ? (
          <div
            ref={modal}
            className="absolute top-[55px] flex flex-col gap-2 w-[300px] px-2 py-4 right-1.5 z-1 bg-[#001330] outline-4 rounded-2xl outline-[#417ae4]"
          >
            <Button click={() => router.push("/perfil")} text="Perfil" bgcolor="bg-[#006DE8]"/>
            <Button click={() => { setCookie("token", ""); router.push("/login")}} text="Sair" bgcolor="bg-[#006DE8]"/>
          </div>
        ) : null}
      </div>
    </header>
  );
};

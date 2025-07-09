"use client";
import { useRouter } from "next/navigation";
import { InputText } from "../inputs/input-text";

export const PerfilPage = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border-4 rounded-2xl p-5">
        <div className="mb-5">
          <div className="border-4 m-auto flex gap-6 justify-center border-amber-500 py-4 rounded-2xl w-80">
            <div>
              <p className="cursor-pointer">Perfil</p>
            </div>
            <div>
              <p className="cursor-pointer">Gerenciar Perfils</p>
            </div>
          </div>
        </div>
        <div className="m-auto w-[800px] p-5 border-5 mb-5 flex flex-col justify-center">
          <div className="flex gap-2 mb-20">
            <div>
              <img className="w-[60px]" src="Vector.svg" alt="" />
            </div>
            <div>
              <p>Maria</p>
              <p>maria@gmail.com</p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex gap-5">
              <div>
                <InputText
                  name="Nome"
                  placeholder="Nome"
                  label="Nome"
                  value={""}
                />
              </div>
              <div>
                <InputText
                  name="Nome"
                  placeholder="Nome"
                  label="Nome"
                  value={""}
                />
              </div>
              <div>
                <InputText
                  name="Nome"
                  placeholder="Nome"
                  label="Nome"
                  value={""}
                />
              </div>
            </div>
            <div className="text-center">
              <button className="bg-amber-500 w-[189px] px-5 py-3 rounded-2xl">
                Salvar
              </button>
            </div>
          </form>
        </div>
        <div className="text-end">
          <button
            onClick={() => router.back()}
            className="w-[42px] cursor-pointer"
          >
            <img className="w-full h-full" src="down.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

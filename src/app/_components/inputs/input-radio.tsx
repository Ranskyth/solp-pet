import { InputType } from "@/types/InputType";
import { CardActionsContext } from "../context/card-actions-context";
import { useContext } from "react";


export const InputRadio = ({ name, placeholder, label }: InputType) => {
  const { types } = useContext(CardActionsContext)
  return (
    <>
  <div>
    <label htmlFor="nome">{label}</label>
  </div>
    <div className="flex gap-2">
      <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
        <input
          placeholder={placeholder}
          type="radio"
          name={name}
          disabled = {types === "Deletar"}
          value={"Cachorro"}
        />
        <p>Cachorro</p>
      </div>
      <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
        <input
          placeholder={placeholder}
          type="radio"
          name={name}
          disabled = {types === "Deletar"}
          value={"Gato"}
        />
        <p>Gato</p>
      </div>
    </div>
    </>
  );
};

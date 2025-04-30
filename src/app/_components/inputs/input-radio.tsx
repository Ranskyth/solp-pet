import { InputProps } from "@/types/InputType";
import { CardActionsContext } from "../context/card-actions-context";
import { useContext } from "react";

export const InputRadio = ({ name, label, value, onChange, disabled }: InputProps) => {
  const { types } = useContext(CardActionsContext);
  return (
    <>
      <div>
        <label>{label}</label>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
          <input
            type="radio"
            name={name}
            value="Cachorro"
            checked={value === "Cachorro"}
            onChange={() => onChange?.("Cachorro")}
            disabled={disabled || types === "Deletar"}
          />
          <p>Cachorro</p>
        </div>
        <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
          <input
            type="radio"
            name={name}
            value="Gato"
            checked={value === "Gato"}
            onChange={() => onChange?.("Gato")}
            disabled={disabled || types === "Deletar"}
          />
          <p>Gato</p>
        </div>
      </div>
    </>
  );
};

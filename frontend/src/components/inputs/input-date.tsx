import { InputProps } from "@/types/InputType";
import { CardActionsContext } from "../context/card-actions-context";
import { useContext } from "react";

export const InputDate = ({ name, placeholder, label, change, value }: InputProps) => {
  const { types } = useContext(CardActionsContext);
  return (
    <>
      <div>
        <label htmlFor="nome">{label}</label>
      </div>
      <div>
        <input
          placeholder={placeholder}
          className="p-2 border-4 w-full border-[#404a5c] rounded-[12px]"
          type="date"
          value={value}
          onChange={change}
          disabled={types == "Deletar"}
          name={name}
        />
      </div>
    </>
  );
};

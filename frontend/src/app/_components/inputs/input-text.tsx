import { InputProps } from "@/types/InputType";
import { CardActionsContext } from "../context/card-actions-context";
import { useContext } from "react";

export const InputText = ({
  label,
  placeholder,
  value,
  change,
  name,
}: InputProps) => {
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
          type="text"
          disabled={types == "Deletar"}
          name={name}
          onChange={change}
          value={value}
        />
      </div>
    </>
  );
};

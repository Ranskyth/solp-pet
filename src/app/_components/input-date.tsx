import { InputType } from "@/types/InputType";
import { CardActionsContext } from "./context/card-actions-context";
import { useContext } from "react";

export const InputDate = ({ name, placeholder }: InputType) => {
  const { types } = useContext(CardActionsContext)
  return (
    <>
      <input
        placeholder={placeholder}
        className="p-2 border-4 w-full border-[#404a5c] rounded-[12px]"
        type="date"
        disabled = {types == "Deletar"}
        name={name}
      />
    </>
  );
};

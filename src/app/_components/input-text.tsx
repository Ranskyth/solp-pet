import { InputType } from "@/types/InputType";

export const InputText = ({ name, placeholder }: InputType) => {
  return (
    <>
      <input
        placeholder={placeholder}
        className="p-2 border-4 w-full border-[#404a5c] rounded-[12px]"
        type="text"
        name={name}
      />
    </>
  );
};

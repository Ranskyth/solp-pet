import { InputType } from "@/types/InputType";


export const InputRadio = ({ name, placeholder }: InputType) => {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
        <input
          placeholder={placeholder}
          type="radio"
          name={name}
          value={"Cachorro"}
        />
        <p>Cachorro</p>
      </div>
      <div className="flex gap-2 border-4 pl-2 w-[130px] rounded-[12px] py-2 border-white">
        <input
          placeholder={placeholder}
          type="radio"
          name={name}
          value={"Gato"}
        />
        <p>Gato</p>
      </div>
    </div>
  );
};

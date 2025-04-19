import { InputType } from "@/types/InputType";
import { InputDate } from "./input-date";
import { InputRadio } from "./input-radio";
import { InputText } from "./input-text";

export const Input = ({ type, label, id, placeholder }: InputType) => {
  return (
    <>
      <div>
        <label htmlFor="nome">{label}</label>
      </div>
      <div>
        {type == "Radio" ? (
          <InputRadio name={id || ""} />
        ) : type == "Date" ? (
          <InputDate name={id || ""} />
        ) : (
          <InputText placeholder={placeholder} name={id || ""} />
        )}
      </div>
    </>
  );
};

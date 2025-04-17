import { InputDate } from "./input-date";
import { InputRadio } from "./input-radio";
import { InputText } from "./input-text";

interface Props {
  label: string;
  placeholder?: string;
  id?:string | undefined;
  type?: "Text" | "Date" | "Radio";
}

export const Input = ({ type, label, id, placeholder }: Props) => {
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

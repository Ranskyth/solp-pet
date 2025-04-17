interface Props {
  name: string;
  placeholder?: string;
}

export const InputDate = ({ name, placeholder }: Props) => {
  return (
    <>
      <input
        placeholder={placeholder}
        className="p-2 border-4 w-full border-[#404a5c] rounded-[12px]"
        type="date"
        name={name}
      />
    </>
  );
};

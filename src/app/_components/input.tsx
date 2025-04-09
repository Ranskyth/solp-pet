interface Props{
    label:string
    type?: 'date' | 'number'
}

export const Input = ({type,label}:Props) => {
  return (
    <>
      <div>
        <label htmlFor="nome">{label}</label>
      </div>
      <div>
        <input
          placeholder="Nome Sobrenome"
          className="p-2 border-4 w-full border-[#404a5c] rounded-[12px]"
          type={type? type : 'text'}
          name="nome"
          id=""
        />
      </div>
    </>
  );
};

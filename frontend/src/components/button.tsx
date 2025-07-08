interface ButtonProps {
  text?: string;
  click?: () => void;
  bgcolor?: "bg-[#e94747]" | 'bg-[#006DE8]' | 'bg-white';
}

export const Button = ({ text, click, bgcolor ="bg-white" }: ButtonProps) => {

  return (
    <button
      onClick={() => click && click()}
      className={`px-8 py-3 rounded-[12px] w-full ${bgcolor} font-extrabold text-[#00c6bf]`}
    >
      {text}
    </button>
  );
};

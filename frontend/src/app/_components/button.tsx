interface ButtonProps{
    text?: string,
    click?: () => void
    color?: string
}

export const Button = ({text,click}:ButtonProps) => {

    return(
        <button
        onClick={() => click && click()}
        className={`px-8 py-3 rounded-[12px] w-full bg-white font-extrabold text-[#00c6bf]`}
      >
        {text}
      </button>
    )
}
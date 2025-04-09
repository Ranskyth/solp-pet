import { Icon } from "./icon";
import { Exit } from "./icons/exit";
import { Input } from "./input";

export const CardActions = () => {
  return (
    <div className="w-[750px] border-4 border-[#0058e2] h-[580px] rounded-2xl p-20 bg-[#011e4d] z-10 absolute">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Icon icon={1} />
          <span>Cadastrar</span>
        </div>
        <button>
          <Exit />
        </button>
      </div>
      <div className="mt-10 gap-x-12 gap-y-1.5 grid grid-cols-2 grid-rows-3">
        <div>
          <Input label="nome" />
        </div>
        <div>
          <Input label="animal" />
        </div>
        <div>
          <Input label="dono" />
        </div>
        <div>
          <Input label="raca" />
        </div>
        <div>
          <Input label="telefone" />
        </div>
        <div>
          <Input label="nascimento" type="date" />
        </div>
        <div className="mt-10">
          <button className="px-8 py-3 rounded-[12px] w-full bg-white text-[#00c6bf]">
            Voltar
          </button>
        </div>
        <div className="mt-10">
          <button className="px-8 py-3 rounded-[12px] w-full bg-linear-90 from-[#00c6fb] to-[#0058e2]">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

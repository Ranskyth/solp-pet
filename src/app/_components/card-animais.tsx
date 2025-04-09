import { Icon } from "./icon";

export const CardAnimais = ({ nome, dono }: { nome: string; dono: string }) => {
  return (
    <div className="w-full h-[95px] rounded-2xl bg-gradient-to-br from-[#011e4d] to-[#000915] hover:outline-4 hover:outline-[#01c6fb] flex items-center px-5">
      <Icon icon={0} />
      <div className="ml-5">
        <div className="flex gap-2">
          <img src="Group.svg" alt="" />
          <p>{nome}</p>
        </div>
        <div className="flex gap-2">
          <img src="Vector.svg" alt="" />
          <p>{dono}</p>
        </div>
      </div>
    </div>
  );
};

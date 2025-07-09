import { Cat } from "./icons/cat";
import { Add } from "./icons/add";
import { Deletar } from "./icons/deletar";
import { Edit } from "./icons/edit";
import { Dog } from "./icons/dog";
import { Options } from "./icons/options";

export const Icon = ({ icon }: { icon: number }) => {
  const Icons = [
    { icon: Cat },
    { icon: Add },
    { icon: Deletar },
    { icon: Edit },
    { icon: Dog },
    { icon: Options },
  ];

  const SeletecIcon = Icons[icon].icon;

  return (
    <div className="bg-gradient-to-tl from-[#0059e3] to-[#00bbf8] flex items-center justify-center h-[60px] w-[60px] rounded-full">
      <SeletecIcon />
    </div>
  );
};

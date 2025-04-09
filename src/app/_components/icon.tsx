import { CatIcon } from "./icons/cat";
import { Add } from "./icons/add";

export const Icon = ({icon}:{icon:number}) => {
  const Icons = [
    { icon: CatIcon },
    {icon: Add},
];

const SeletecIcon = Icons[icon].icon 

  return (
    <div className="bg-gradient-to-tl from-[#0059e3] to-[#00bbf8] flex items-center justify-center h-[60px] w-[60px] rounded-full">
     <SeletecIcon/>
    </div>
  );
};

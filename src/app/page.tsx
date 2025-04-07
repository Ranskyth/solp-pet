import { Header } from "./_components/header";

export default function Home() {
  return (
    <div className="px-[65px] py-[30px]">
      <Header/>
      <div className="my-6 flex gap-2">
      <div className="inline-flex items-center w-[85%] relative">
        <input className="border-3 w-[100%] border-[#404a5c] p-3 rounded-[12px]" type="text" />
        <button className="absolute right-[5px] rounded-[8px] px-8 py-2 bg-[#404a5c] font-[700]">Pesquisar</button>
      </div>
      <button className="px-8 py-3 bg-linear-to-br from-[#00c1fa] to-[#0059e3] rounded-[12px]">Cadastrar</button>
      </div>
      <div className="grid gap-4 grid-cols-4 grid-rows-4">
        {[...Array(16)].map((x)=>{
          return(
                 <div key={x} className="w-full h-[95px] rounded-2xl bg-gradient-to-br from-[#011e4d] to-[#000915] hover:outline-4 hover:outline-[#01c6fb] flex items-center px-5">
                 <div className="bg-gradient-to-tl from-[#0059e3] to-[#00bbf8] flex items-center justify-center h-[60px] w-[60px] rounded-full">
         
                 <img src="cat.svg" alt="" />
                 </div>
                </div>)
        })}


      </div>
      <div className="flex mt-4 gap-1 justify-end">
        <button><img src="down.svg" alt="" /></button>
        <p>1</p>
        <p>de</p>
        <p>321</p>
        <button><img src="up.svg" alt="" /></button>
      </div>
      
    </div>
  );
}

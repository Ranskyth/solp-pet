export interface NameAnimaisAndDonosType {
  nome: string;
  nascimento: string;
  raca: string;
  dono: {
      id:string; 
      nome: string;
      telefone: string;
    };
  }
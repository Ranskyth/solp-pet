export interface DonosType {
  cadastros: [
    {
      nome: string;
      nascimento: string;
      raca: string;
      tipo: string;
      dono: {
        id: string;
        nome: string;
        telefone: string;
      };
    },
  ];
  pages: number;
}

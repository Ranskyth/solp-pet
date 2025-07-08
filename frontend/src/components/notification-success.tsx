/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const notificationSuccess = (msg?:string) => {
    toast.success(`${msg ? msg : "Tarefa Feita com Sucesso"}`)
    setTimeout(() => {
      location.reload();
    }, 1500);
};

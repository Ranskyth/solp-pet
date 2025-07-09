/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const notificationErro = (msg?: string) => {
  toast.error(`${msg}`);
  setTimeout(() => {}, 2200);
};

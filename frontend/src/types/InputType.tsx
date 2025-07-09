/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  value: any | "Cachorro" | "Gato" | "";
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: "Cachorro" | "Gato") => void;
  type?: "Text" | "Date" | "Radio";
  disabled?: boolean;
  TipoAnimal?: "Gato" | "Cachorro";
}

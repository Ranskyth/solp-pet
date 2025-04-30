import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string | "Cachorro" | "Gato" | "";
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: "Cachorro" | "Gato") => void;
  type?: "Text" | "Date" | "Radio"; 
  disabled?: boolean; 
  TipoAnimal?: "Gato" | "Cachorro"; 
}

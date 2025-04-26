import { ChangeEvent } from "react";

export interface InputType {
    name?: string;
    label?: string;
    value?: string;
    change?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
    type?: "Text" | "Date" | "Radio";
  }
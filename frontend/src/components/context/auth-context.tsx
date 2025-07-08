"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BACKEND_API } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { notificationErro } from "../notification-erro";
import { notificationSuccess } from "../notification-success";
interface IProps {
  user: string;
  Auth: boolean;
  login: (email: any, password: any) => Promise<void>;
}
export const AuthContext = createContext({} as IProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = getCookie("token");
  const [user] = useState<string>(String(token));
  const Auth = !!token;
  const router = useRouter();

  useEffect(() => {
    if (Auth == true) {
      router.push("/");
    }
  }, [Auth]);

  const login = async (email: string, password: string):Promise<void> => {
    const res = await fetch(`${BACKEND_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization":`token ${getCookie("token")}` },
      body: JSON.stringify({ email, password }),
    });

    if(!res.ok){
      return notificationErro("Email ou Senha Invalido")
    }

    const resjson:{token:string} = await res.json()

    
    if(resjson) {
      await setCookie("token", (resjson.token));
      router.push("/")
      return notificationSuccess()
    }
    
  };
  return (
    <AuthContext.Provider value={{ Auth, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

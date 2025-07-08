/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({ data: [{ cpf: "33333333333", email: "user@example.com", nome: "user", password: "12345678" },{ cpf: "2222222222", email: "admin2@example.com", nome: "admin2", password: "12345678" }, { cpf: "1111111111", email: "admin@example.com", nome: "admin", password: "12345678" }], })
}

(() => {
    try{
        main();
    }catch(err){
        console.log("err",err)
    }
})()


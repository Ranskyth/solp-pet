/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private prisma: PrismaClient) { }

  @Post('/donos')
  async createDono(@Body() body: any) {
    try {
      const { nome, animal, telefone } = body;

      console.log(nome, telefone, animal)

      
      const db = await this.prisma.dono.create({
        data: { nome, telefone, animal },
      });
    
      return { mensagem: `Dono criado com sucesso com o id : ${db.id}` };
    } catch(error){
      return {
        mensagem: "error ao fazer o cadastro",
        error:error
      }
    }
  }
  @Get('/animal/dono/:id')
  GetAll(@Param() param: any){
    const {id} = param
    const db = this.prisma.dono.findUnique({where:{id}, select:{animal:true, id: true, nome:true, telefone:true}})
    
    return db
  }
  @Get()
  Main() {
    return {
      mensagem: 'Bem-Vindo!',
    };
  }
  @Delete('/donos/:id')
  async DeleteDono(@Param() params: any) {
    const { id } = params;

    const Data = await this.prisma.dono.delete({ where: { id } });

    return {
      mensagem: `Deletado o Dono com ID : ${Data.id}`,
    };
  }
  @Get('/pet/dono')
  async getAnimal() {
    try {
      const animaisOnDonos = await this.prisma.animal.findMany({ select: {nome: true,raca:true,nascimento:true, dono: { select: { id: true, nome: true, telefone : true } } } });

      return animaisOnDonos;
    } catch (error) {
      return { error: `error in ${error}` }
    }
  }
  @Get('/donos')
  async getDonos() {
    try {
      const donos = await this.prisma.dono.findMany();

      if (donos == undefined || donos == null) {
        return { mensagem: "nenhum cadastro no banco de dados" }
      }

      return donos;
    } catch {
  
      return { error: "error in donos" }
    }
  }
  @Put('/donos/:id')
  async UptadeDono(@Param() param: any, @Body() body: any) {
    const { id } = param;
    const { animal, nome, telefone } = body;
    const db = await this.prisma.dono.update({
      where: { id },
      data: { animal, nome, telefone },
    });

    return {
      mensagem: `dono com id : ${db.id} atualizado com sucesso`,
    };
  }
  @Get('/pets')
  async getPets() {
    const pets = await this.prisma.animal.findMany();

    return pets;
  }
}

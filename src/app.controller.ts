/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

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
  constructor(private prisma: PrismaClient) {}

  @Post('/donos')
  async createDono(@Body() body: any) {
    const { nome, animal, endereco, cpf, telefone } = body;

    const db = await this.prisma.dono.create({
      data: { nome, telefone, animal, endereco, cpf },
    });
    return { mensagem: `Dono criado com sucesso com o id : ${db.id}` };
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
  @Get('/donos')
  async getDonos() {
    const donos = await this.prisma.dono.findMany();

    return donos;
  }
  @Put('/donos/:id')
  async UptadeDono(@Param() param: any, @Body() body: any) {
    const { id } = param;
    const { animal, cpf, endereco, nome, telefone } = body;
    const db = await this.prisma.dono.update({
      where: { id },
      data: { animal, cpf, endereco, nome, telefone },
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

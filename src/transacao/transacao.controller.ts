import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() createTransacaoDto: CreateTransacaoDto) {
    return this.transacaoService.create(createTransacaoDto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get('conta/:conta_id')
  findByContaId(@Param('conta_id') conta_id: string) {
    return this.transacaoService.findByContaId(conta_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransacaoDto: UpdateTransacaoDto) {
    return this.transacaoService.update(id, updateTransacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacaoService.remove(id);
  }
}

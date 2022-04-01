import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() createtransacaoDto: CreateTransacaoDto) {
    return this.transacaoService.create(createtransacaoDto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatetransacaoDto: UpdateTransacaoDto) {
    return this.transacaoService.update(id, updatetransacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacaoService.remove(id);
  }
}

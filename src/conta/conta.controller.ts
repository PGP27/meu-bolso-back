import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post()
  create(@Body() createcontaDto: CreateContaDto) {
    return this.contaService.create(createcontaDto);
  }

  @Get()
  findAll() {
    return this.contaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatecontaDto: UpdateContaDto) {
    return this.contaService.update(id, updatecontaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaService.remove(id);
  }
}

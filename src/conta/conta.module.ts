import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conta, ContaSchema } from './entities/conta.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conta.name, schema: ContaSchema }]),
  ],
  controllers: [ContaController],
  providers: [ContaService]
})
export class ContaModule {}

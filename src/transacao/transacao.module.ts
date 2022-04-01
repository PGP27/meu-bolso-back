import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transacao, TransacaoSchema } from './entities/transacao.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transacao.name, schema: TransacaoSchema }]),
  ],
  controllers: [TransacaoController],
  providers: [TransacaoService]
})
export class TransacaoModule {}

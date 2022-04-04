import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { ContaModule } from './conta/conta.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    MongooseModule.forRoot(process.env.DB_CONFIG, { useFindAndModify: false }),
    UsuarioModule,
    ContaModule,
    TransacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

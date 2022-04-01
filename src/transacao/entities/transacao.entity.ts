import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransacaoDocument = Transacao & Document;

@Schema()
export class Transacao {
  @Prop()
  tipo: 'ENTRADA' | 'SAIDA';

  @Prop()
  categoria: string;

  @Prop()
  valor: number;

  @Prop()
  usuario_id: string;

  @Prop()
  conta_id: string;

  @Prop()
  descricao: string;

  @Prop()
  favorito: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);

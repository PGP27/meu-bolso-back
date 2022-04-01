import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContaDocument = Conta & Document;

@Schema()
export class Conta {
  @Prop()
  nome: string;

  @Prop()
  usuario_id: string;

}

export const ContaSchema = SchemaFactory.createForClass(Conta);

export class CreateTransacaoDto {
  tipo: 'ENTRADA' | 'SAIDA';
  categoria: string;
  valor: number;
  usuario_id: string;
  conta_id: string;
  descricao: string;
  favorito: boolean;
}

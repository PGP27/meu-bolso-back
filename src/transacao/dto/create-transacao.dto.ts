export class CreateTransacaoDto {
  tipo: 'ENTRADA' | 'SAIDA';
  categoria: string;
  valor: number;
  conta_id: string;
  descricao: string;
  favorito: boolean;
}

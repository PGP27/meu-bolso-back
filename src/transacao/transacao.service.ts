import { Transacao, TransacaoDocument } from './entities/transacao.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Injectable()
export class TransacaoService {

  constructor(@InjectModel(Transacao.name) private transacaoModel: Model<TransacaoDocument>) {}

  create(createtransacaoDto: CreateTransacaoDto) {
    const transacao = new this.transacaoModel(createtransacaoDto);
    return transacao.save();
  }

  async findAll() {
    const transacoes = await this.transacaoModel.find();
    return {
      transacoes,
    };
  }

  async findByContaId(conta_id: string) {
    const transacoes = await this.transacaoModel.find({conta_id});
    if (transacoes.length === 0) {
      throw new HttpException(
        { message: "Essa conta não possui transações ou não existe." },
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      transacoes,
    };
  }

  async findOne(id: string) {
    const transacao = await this.transacaoModel.find({_id: id});
    if (transacao.length !== 1) {
      throw new HttpException(
        { message: "Usuário não encontrado." },
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      transacao: transacao[0],
    };
  }

  update(id: string, updatetransacaoDto: UpdateTransacaoDto) {
    return this.transacaoModel.findByIdAndUpdate({_id: id}, {$set: UpdateTransacaoDto}, {new: true});
  }

  remove(id: string) {
    return this.transacaoModel.deleteOne({_id: id}).exec();
  }
}

import { Transacao, TransacaoDocument } from './entities/transacao.entity';
import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.transacaoModel.find();
  }

  findOne(id: string) {
    return this.transacaoModel.findById(id);
  }

  update(id: string, updatetransacaoDto: UpdateTransacaoDto) {
    return this.transacaoModel.findByIdAndUpdate({_id: id}, {$set: UpdateTransacaoDto}, {new: true});
  }

  remove(id: string) {
    return this.transacaoModel.deleteOne({_id: id}).exec();
  }
}

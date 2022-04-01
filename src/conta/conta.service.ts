import { Conta, ContaDocument } from './entities/conta.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContaService {

  constructor(@InjectModel(Conta.name) private contaModel: Model<ContaDocument>) {}

  create(createcontaDto: CreateContaDto) {
    const conta = new this.contaModel(createcontaDto);
    return conta.save();
  }

  findAll() {
    return this.contaModel.find();
  }

  findOne(id: string) {
    return this.contaModel.findById(id);
  }

  update(id: string, updatecontaDto: UpdateContaDto) {
    return this.contaModel.findByIdAndUpdate({_id: id}, {$set: UpdateContaDto}, {new: true});
  }

  remove(id: string) {
    return this.contaModel.deleteOne({_id: id}).exec();
  }
}

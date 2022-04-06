import { Conta, ContaDocument } from './entities/conta.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContaService {

  constructor(@InjectModel(Conta.name) private contaModel: Model<ContaDocument>) {}

  async create(createContaDto: CreateContaDto) {
    const { nome, usuario_id } = createContaDto;
    if (nome && usuario_id) {
      const nomeRegex = /^[a-zA-Z ]{1,20}$/;
      if (!nome.match(nomeRegex)) {
        throw new HttpException(
          { message: "Nome precisa ter entre 1 e 20 caracteres contendo apenas letras e espaços" },
          HttpStatus.BAD_REQUEST
        );
      }
      const newConta = new this.contaModel(createContaDto);
      return newConta.save();
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  async findAll() {
    const contas = await this.contaModel.find();
    return {
      contas,
    };
  }

  async findByUsuarioId(usuario_id: string) {
    if (usuario_id) {
      const documents = await this.contaModel.find({usuario_id});
      if (documents.length > 0) {
        return {
          contas: documents,
        };
      }
      throw new HttpException(
        { message: "Usuário especificado não possui conta." },
        HttpStatus.BAD_REQUEST
      );  
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  async findOne(id: string) {
    const conta = await this.contaModel.find({_id: id});
    if (conta.length !== 1) {
      throw new HttpException(
        { message: "Usuário não encontrado." },
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      conta: conta[0],
    };
  }

  async update(id: string, updateContaDto: UpdateContaDto) {
    const { nome } = updateContaDto;
    if (nome) {
      const nomeRegex = /^[a-zA-Z ]{1,20}$/;
      if (!nome.match(nomeRegex)) {
        throw new HttpException(
          { message: "Nome precisa ter entre 1 e 20 caracteres contendo apenas letras e espaços" },
          HttpStatus.BAD_REQUEST
        );
      }
      const searchConta = await this.contaModel.find({_id: id});
      const conta = {
        _id: searchConta[0]._id,
        nome: nome || searchConta[0].nome,
        usuario: searchConta[0].usuario_id,
      };
      return this.contaModel.findByIdAndUpdate({_id: id}, {$set: conta}, {new: true});
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  remove(id: string) {
    return this.contaModel.deleteOne({_id: id}).exec();
  }
}

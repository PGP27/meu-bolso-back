import { Usuario, UsuarioDocument } from './entities/usuario.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { nome, senha, usuario } = createUsuarioDto;
    if (nome && senha && usuario) {
      const nomeRegex = /^[a-zA-Z ]{1,100}$/;
      if (!nome.match(nomeRegex)) {
        throw new HttpException(
          { message: "Nome precisa ter entre 1 e 100 caracteres contendo apenas letras e espaço" },
          HttpStatus.BAD_REQUEST
        );
      }
      const senhaRegex = /^[a-zA-Z0-9]{6,20}$/;
      if (!senha.match(senhaRegex)) {
        throw new HttpException(
          { message: "Senha precisa ter entre 6 e 20 caracteres contendo apenas letras e números." },
          HttpStatus.BAD_REQUEST
        );
      }
      const usuarioRegex = /^[a-zA-Z0-9]{3,20}$/;
      if (!usuario.match(usuarioRegex)) {
        throw new HttpException(
          { message: "Usuario precisa ter entre 3 e 20 caracteres contendo apenas letras e números." },
          HttpStatus.BAD_REQUEST
        );
      }
      const searchUsuario = await this.usuarioModel.find({usuario});
      if (searchUsuario.length !== 0) {
        throw new HttpException(
          { message: "Esse usuário já existe." },
          HttpStatus.BAD_REQUEST
        );
      }
      const newUsuario = new this.usuarioModel(createUsuarioDto);
      return newUsuario.save();
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  async findAll() {
    const usuarios = await this.usuarioModel.find();
    return {
      usuarios,
    };
  }

  async findOne(id: string) {
    const usuario = await this.usuarioModel.find({_id: id});
    if (usuario.length !== 1) {
      throw new HttpException(
        { message: "Usuário não encontrado." },
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      usuario: usuario[0],
    };
  }

  async findOneByLogin (usuario: string, senha: string) {
    if (usuario && senha) {
      const documents = await this.usuarioModel.find({$and: [{usuario}, {senha}]});
      if (documents.length === 1) {
        return documents;
      }
      throw new HttpException(
        { message: "Usuário ou senha inválidos." },
        HttpStatus.UNAUTHORIZED
      );  
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { nome, senha, usuario } = updateUsuarioDto;
    if (nome || senha || usuario) {
      const nomeRegex = /^[a-zA-Z ]{1,100}$/;
      if (nome && !nome.match(nomeRegex)) {
        throw new HttpException(
          { message: "Nome precisa ter entre 1 e 100 caracteres contendo apenas letras e espaço" },
          HttpStatus.BAD_REQUEST
        );
      }
      const senhaRegex = /^[a-zA-Z0-9]{6,20}$/;
      if (senha && !senha.match(senhaRegex)) {
        throw new HttpException(
          { message: "Senha precisa ter entre 6 e 20 caracteres contendo apenas letras e números." },
          HttpStatus.BAD_REQUEST
        );
      }
      const usuarioRegex = /^[a-zA-Z0-9]{3,20}$/;
      if (usuario && !usuario.match(usuarioRegex)) {
        throw new HttpException(
          { message: "Usuario precisa ter entre 3 e 20 caracteres contendo apenas letras e números." },
          HttpStatus.BAD_REQUEST
        );
      }
      const searchUsuario = await this.usuarioModel.find({_id: id});
      if (searchUsuario.length !== 1) {
        throw new HttpException(
          { message: "Esse usuário não existe." },
          HttpStatus.BAD_REQUEST
        );
      }
      const user = {
        nome: nome || searchUsuario[0].nome,
        senha: senha || searchUsuario[0].senha,
        usuario: usuario || searchUsuario[0].usuario,
      };
      return this.usuarioModel.findByIdAndUpdate({_id: id}, {$set: user}, {new: true});
    }
    throw new HttpException(
      { message: "Campo obrigatorio não preenchido." },
      HttpStatus.BAD_REQUEST
    );
  }

  remove(id: string) {
    return this.usuarioModel.deleteOne({_id: id}).exec();
  }
}

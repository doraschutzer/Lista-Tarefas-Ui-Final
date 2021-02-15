import * as moment from "moment";



export class Permissao {
  codigo: number;
  descricao: string;
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: any = [];

  static toJson(usuario: Usuario): any {
    return {
      codigo: usuario.codigo,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      permissoes: usuario.permissoes
    };
  }
}

export class Etiqueta {
  codigo: number;
  nome: string;

  static toJson(etiqueta: Etiqueta): any {
    return {
      codigo: etiqueta.codigo,
      nome: etiqueta.nome,
    };
  }
}

export class Tarefa {
  codigo: number;
  descricao: string;
  dataRealizacao: Date;
  observacao: string;
  usuario = new Usuario();
  etiqueta = new Etiqueta();

  static toJson(tarefa: Tarefa): any {
    return {
      codigo: tarefa.codigo,
      descricao: tarefa.descricao,
      dataRealizacao: moment(tarefa.dataRealizacao).format('DD/MM/YYYY'),
      observacao: tarefa.observacao,
      usuario: tarefa.usuario,
      etiqueta: tarefa.etiqueta
    };
  }
}

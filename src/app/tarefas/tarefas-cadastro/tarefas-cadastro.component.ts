import { TarefaService } from './../tarefa.service';
import { EtiquetaService } from './../../etiquetas/etiqueta.service';
import { Tarefa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tarefas-cadastro',
  templateUrl: './tarefas-cadastro.component.html',
  styleUrls: ['./tarefas-cadastro.component.css']
})
export class TarefasCadastroComponent implements OnInit {

  usuarios = [];

  etiquetas = [];

  tarefa = new Tarefa();

  constructor(
    private tarefaService: TarefaService,
    private etiquetaService: EtiquetaService,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoTarefa = this.route.snapshot.params[`codigo`];

    this.title.setTitle('Cadastro de Tarefas');

    if (codigoTarefa) {
      this.carregarTarefa(codigoTarefa);
    }

    this.carregarUsuarios();
    this.carregarEtiquetas();
  }

  carregarEtiquetas(): any {
    return this.etiquetaService.listar()
      .then(etiquetas => {
        this.etiquetas = etiquetas
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(): boolean {
    return Boolean(this.tarefa.codigo);
  }

  carregarUsuarios(): any {
    return this.usuarioService.listar()
      .then(usuarios => {
        this.usuarios = usuarios
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTarefa(codigo: number): void {
    this.tarefaService.buscarPorCodigo(codigo)
      .then(tarefa => {
        this.tarefa = tarefa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl): void {
    if (this.editando) {
      this.atualizarTarefa(form);
    } else {
      this.adicionarTarefa(form);
    }
  }

  adicionarTarefa(form: FormControl): void {
    this.tarefaService.adicionar(this.tarefa)
      .then((tarefaAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Tarefa adicionada com sucesso!' });

        this.router.navigate(['/tarefas', tarefaAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTarefa(form: FormControl): void {
    this.tarefaService.atualizar(this.tarefa)
      .then(tarefa => {
        this.tarefa = tarefa;

        this.messageService.add({ severity: 'success', detail: 'Tarefa alterada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl): void {
    form.reset();


    setTimeout(function() {
      this.tarefa = new Tarefa();
    }.bind(this), 1);

    this.router.navigate(['/tarefas/novo']);
  }


}

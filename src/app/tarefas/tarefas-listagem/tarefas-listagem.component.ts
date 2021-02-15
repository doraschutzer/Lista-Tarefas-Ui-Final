import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-tarefas-listagem',
  templateUrl: './tarefas-listagem.component.html',
  styleUrls: ['./tarefas-listagem.component.css']
})
export class TarefasListagemComponent implements OnInit {

  tarefas = [];

  constructor(
    private tarefaService: TarefaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.tarefaService.listar()
    .then(resultado => {
      this.tarefas = resultado;
    });
  }

  confirmarExclusao(tarefa: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tarefa);
      }
    });
  }

  excluir(tarefa: any): void {
    this.tarefaService.excluir(tarefa.codigo)
      .then(() => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Tarefa excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

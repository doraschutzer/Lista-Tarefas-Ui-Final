import { EtiquetaService } from './../etiqueta.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etiquetas-listagem',
  templateUrl: './etiquetas-listagem.component.html',
  styleUrls: ['./etiquetas-listagem.component.css']
})
export class EtiquetasListagemComponent implements OnInit {

  etiquetas = [];

  constructor(
    private etiquetaService: EtiquetaService,
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
    this.etiquetaService.listar()
    .then(resultado => {
      this.etiquetas = resultado;
    });
  }

  confirmarExclusao(etiqueta: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(etiqueta);
      }
    });
  }

  excluir(etiqueta: any): void {
    this.etiquetaService.excluir(etiqueta.codigo)
      .then(() => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Etiqueta excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

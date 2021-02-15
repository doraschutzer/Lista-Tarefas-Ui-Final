import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Etiqueta } from 'src/app/core/model';
import { EtiquetaService } from '../etiqueta.service';

@Component({
  selector: 'app-etiquetas-cadastro',
  templateUrl: './etiquetas-cadastro.component.html',
  styleUrls: ['./etiquetas-cadastro.component.css']
})
export class EtiquetasCadastroComponent implements OnInit {

  usuarios = [];

  etiquetas = [];

  etiqueta = new Etiqueta();

  constructor(
    private etiquetaService: EtiquetaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoEtiqueta = this.route.snapshot.params[`codigo`];

    this.title.setTitle('Cadastro de Etiquetas');

    if (codigoEtiqueta) {
      this.carregarEtiqueta(codigoEtiqueta);
    }
  }

  get editando(): boolean {
    return Boolean(this.etiqueta.codigo);
  }

  carregarEtiqueta(codigo: number): void {
    this.etiquetaService.buscarPorCodigo(codigo)
      .then(etiqueta => {
        this.etiqueta = etiqueta;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl): void {
    if (this.editando) {
      this.atualizarEtiqueta(form);
    } else {
      this.adicionarEtiqueta(form);
    }
  }

  adicionarEtiqueta(form: FormControl): void {
    this.etiquetaService.adicionar(this.etiqueta)
      .then((etiquetaAdicionada) => {
        this.messageService.add({ severity: 'success', detail: 'Etiqueta adicionada com sucesso!' });

        this.router.navigate(['/etiquetas', etiquetaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEtiqueta(form: FormControl): void {
    this.etiquetaService.atualizar(this.etiqueta)
      .then(etiqueta => {
        this.etiqueta = etiqueta;

        this.messageService.add({ severity: 'success', detail: 'Etiqueta alterada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl): void {
    form.reset();


    setTimeout(function() {
      this.etiqueta = new Etiqueta();
    }.bind(this), 1);

    this.router.navigate(['/etiquetas/novo']);
  }

}

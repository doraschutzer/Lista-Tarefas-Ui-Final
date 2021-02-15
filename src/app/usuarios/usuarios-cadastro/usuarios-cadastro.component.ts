import { FormControl } from '@angular/forms';
import { PermissaoService } from './../../permissoes/permissao.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Permissao, Usuario } from 'src/app/core/model';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})
export class UsuariosCadastroComponent implements OnInit {

  permissoes = [];

  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private permissaoService: PermissaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoUsuario = this.route.snapshot.params[`codigo`];

    this.title.setTitle('Cadastro de Usuários');

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.carregarPermissoes();
  }

  carregarPermissoes(): any {
    return this.permissaoService.listar()
    .then(permissoes => {
      this.permissoes = permissoes;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

  get editando(): boolean {
    return Boolean(this.usuario.codigo);
  }

  carregarUsuario(codigo: number): void {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl): void {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl): void {
    this.usuarioService.adicionar(this.usuario)
      .then((usuarioAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });

        this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl): void {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;

        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl): void {
    form.reset();


    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }


}

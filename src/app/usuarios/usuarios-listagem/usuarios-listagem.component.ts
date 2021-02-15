import { AuthService } from 'src/app/seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-listagem',
  templateUrl: './usuarios-listagem.component.html',
  styleUrls: ['./usuarios-listagem.component.css']
})
export class UsuariosListagemComponent implements OnInit {

  usuarios = [];

  constructor(
    private usuarioService: UsuarioService,
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
    this.usuarioService.listar()
    .then(resultado => {
      this.usuarios = resultado;
    });
  }

  confirmarExclusao(usuario: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any): void {
    this.usuarioService.excluir(usuario.codigo)
      .then(() => {
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}

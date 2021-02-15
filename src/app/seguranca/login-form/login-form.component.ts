import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  msg: any;
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  login(usuario: string, senha: string): void {
    this.auth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/tarefas']);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
      this.error = true;
    });
  }

}

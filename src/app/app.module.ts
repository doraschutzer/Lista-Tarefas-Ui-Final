import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AuthService } from './seguranca/auth.service';
import { TarefasListagemComponent } from './tarefas/tarefas-listagem/tarefas-listagem.component';
import { TarefasModule } from './tarefas/tarefas.module';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './seguranca/auth.guard';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { TarefasCadastroComponent } from './tarefas/tarefas-cadastro/tarefas-cadastro.component';
import { EtiquetasListagemComponent } from './etiquetas/etiquetas-listagem/etiquetas-listagem.component';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { EtiquetasCadastroComponent } from './etiquetas/etiquetas-cadastro/etiquetas-cadastro.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosListagemComponent } from './usuarios/usuarios-listagem/usuarios-listagem.component';
import { UsuariosCadastroComponent } from './usuarios/usuarios-cadastro/usuarios-cadastro.component';

const rotas: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full'},
  {
    path: 'tarefas',
    component: TarefasListagemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_TAREFA'] }
  },
  {
    path: 'tarefas/novo',
    component: TarefasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TAREFA'] }
  },
  {
    path: 'tarefas/:codigo',
    component: TarefasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ATUALIZAR_TAREFA'] }
  },
  {
    path: 'etiquetas',
    component: EtiquetasListagemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ETIQUETA'] }
  },
  {
    path: 'etiquetas/novo',
    component: EtiquetasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ETIQUETA'] }
  },
  {
    path: 'etiquetas/:codigo',
    component: EtiquetasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ATUALIZAR_ETIQUETA'] }
  },
  {
    path: 'usuarios',
    component: UsuariosListagemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_USUARIO'] }
  },
  {
    path: 'usuarios/novo',
    component: UsuariosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] }
  },
  {
    path: 'usuarios/:codigo',
    component: UsuariosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ATUALIZAR_USUARIO'] }
  },
  { path: 'login', component: LoginFormComponent},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rotas),
    TableModule,
    ButtonModule,
    TooltipModule,
    TarefasModule,
    EtiquetasModule,
    UsuariosModule,
    SegurancaModule,
    CoreModule,
    SharedModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

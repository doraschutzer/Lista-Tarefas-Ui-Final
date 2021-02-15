import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListagemComponent } from './usuarios-listagem/usuarios-listagem.component';
import { InputTextModule } from 'primeng/inputtext';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';

@NgModule({
  declarations: [
    UsuariosListagemComponent,
    UsuariosCadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,

    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    SharedModule
  ]
})
export class UsuariosModule { }

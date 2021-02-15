import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TarefasCadastroComponent } from './tarefas-cadastro/tarefas-cadastro.component';
import { TarefasListagemComponent } from './tarefas-listagem/tarefas-listagem.component';



@NgModule({
  declarations: [
    TarefasListagemComponent,
    TarefasCadastroComponent
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
    InputTextareaModule,
    SharedModule
  ]
})
export class TarefasModule { }

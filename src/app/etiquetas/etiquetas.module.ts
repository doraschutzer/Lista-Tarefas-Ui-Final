import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtiquetasListagemComponent } from './etiquetas-listagem/etiquetas-listagem.component';
import { InputTextModule } from 'primeng/inputtext';
import { EtiquetasCadastroComponent } from './etiquetas-cadastro/etiquetas-cadastro.component';



@NgModule({
  declarations: [
    EtiquetasListagemComponent,
    EtiquetasCadastroComponent],
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
export class EtiquetasModule { }

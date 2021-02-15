import { Tarefa } from './../core/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  tarefasUrl = 'http://localhost:8080/tarefas';

  constructor(private http: HttpClient) { }

  listar(): Promise<any> {
    return this.http.get(`${this.tarefasUrl}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  adicionar(tarefa: Tarefa): Promise<Tarefa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Tarefa>(this.tarefasUrl,
      Tarefa.toJson(tarefa), { headers })
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.tarefasUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
  }

  atualizar(tarefa: Tarefa): Promise<Tarefa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Tarefa>(`${this.tarefasUrl}/${tarefa.codigo}`,
      Tarefa.toJson(tarefa), { headers })
      .toPromise()
      .then(response => {
        const tarefaAlterada = response;

        this.converterStringsParaDatas([tarefaAlterada]);

        return tarefaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Tarefa> {
    return this.http.get<Tarefa>(`${this.tarefasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const tarefa = response;

        this.converterStringsParaDatas([tarefa]);

        return tarefa;
      });
  }

  private converterStringsParaDatas(tarefas: Tarefa[]): void {
    for (const tarefa of tarefas) {
      tarefa.dataRealizacao = moment(tarefa.dataRealizacao,
        'DD/MM/YYYY').toDate();
    }
  }
}


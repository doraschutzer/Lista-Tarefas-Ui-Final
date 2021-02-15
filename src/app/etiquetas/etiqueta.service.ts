import { Etiqueta } from './../core/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  etiquetasUrl = 'http://localhost:8080/etiquetas';

  constructor(private http: HttpClient ) { }

  listar(): Promise<any> {
    return this.http.get(this.etiquetasUrl)
      .toPromise();
  }

  adicionar(etiqueta: Etiqueta): Promise<Etiqueta> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Etiqueta>(this.etiquetasUrl,
      Etiqueta.toJson(etiqueta), { headers })
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.etiquetasUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
  }

  atualizar(etiqueta: Etiqueta): Promise<Etiqueta> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Etiqueta>(`${this.etiquetasUrl}/${etiqueta.codigo}`,
      Etiqueta.toJson(etiqueta), { headers })
      .toPromise()
      .then(response => {
        const tarefaAlterada = response;
        return tarefaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Etiqueta> {
    return this.http.get<Etiqueta>(`${this.etiquetasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const etiqueta = response;
        return etiqueta;
      });
  }
}

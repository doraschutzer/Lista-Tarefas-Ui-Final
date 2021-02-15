import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient ) { }

  listar(): Promise<any> {
    return this.http.get(this.usuariosUrl)
      .toPromise();
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Usuario>(this.usuariosUrl,
      Usuario.toJson(usuario), { headers })
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.codigo}`,
      Usuario.toJson(usuario), { headers })
      .toPromise()
      .then(response => {
        const tarefaAlterada = response;
        return tarefaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response;
        return usuario;
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  permissoesUrl = 'http://localhost:8080/permissoes';

  constructor(private http: HttpClient ) { }

  listar(): Promise<any> {
    return this.http.get(this.permissoesUrl)
      .toPromise();
  }

}

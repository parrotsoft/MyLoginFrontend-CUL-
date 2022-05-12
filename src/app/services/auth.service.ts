import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Llamamos el servidio que autentica al usuario y retorna un token jwt
  validateLogin(usuario: string, clave: string) {
    const data = {
      usuario,
      clave
    };
    return this.http.post(`${environment.api}auth`, data);
  }

  // Guarda el token en localstorage
  setTokenLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  // Decodifica el token que previamente esta guardado en localstore
  getDataToken() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      return helper.decodeToken(token);
    }
    return null;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}

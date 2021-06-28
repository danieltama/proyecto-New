import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Usuarios } from '../Modelos/usuarios';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  selectedUser: Usuarios;

  usuarios : Usuarios[] = [];

  private URL = 'http://44.237.245.239:3000/api'

  constructor(private http: HttpClient,
    private router: Router,
    )  {
      this.selectedUser = new Usuarios();
    }

  getUsuario(){
    return this.http.get(this.URL + '/users');
  }

  postUsuario(){
    return this.http.post(this.URL, '/users');
  }

  putUsuario(id: String, usuario: Usuarios){
    return this.http.put(this.URL + '/user/' + id, usuario,{ observe: "response"});
  }


  public deleteUsuario(id: String){
    return this.http.delete<boolean>(this.URL + '/users/' + id, {observe: 'response'});
  }

  registro(user: any){
    return this.http.post<any>(this.URL + '/registro', user);
  }

  sesion(user: any){
    return this.http.post<any>(this.URL + '/sesion', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }



}

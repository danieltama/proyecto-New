import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { RegistroService } from '../../../Servicios/registro.service';
import { Usuarios } from '../../../Modelos/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  public actualizarUsuarioForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });


  public usuarios : Usuarios[] = [];

  constructor(public registroService: RegistroService, private router:Router) { }



  user = {
    username: '',
    password: ''
  }
  usuario: any =[];
  public forUpdate: any =[];

  ngOnInit(): void {
    this.getUsuario();
    this.registroService.getUsuario().subscribe
    (res => {
      this.usuario = res;
    })
  }


  public getUsuario(){
    this.registroService.getUsuario()
    .subscribe(res => {
        this.registroService.usuarios = res as Usuarios[];
        console.log(res);
      });
  }

  public obtenerDato(usuario: Usuarios){
    this.forUpdate = usuario;
    console.log(usuario);
  }

  public actualizarUsuario(form: Usuarios) {
    var id = this.forUpdate.usuario;
    //console.log(form);
    console.log(id);

    this.registroService.putUsuario(id, form).subscribe(
      resp => {
        console.log("result: ", resp);
      }

    );
    //location.reload();
  }




  public eliminarUsuario(id: String){
    if(confirm('¿Estas Seguro de Querer Eliminarlo?')) {
      this.registroService.deleteUsuario(id)
      .subscribe(res => {
        console.log("result: ", res);
      }
      );
      location.reload();
    }
  }

}

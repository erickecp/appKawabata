import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URLAPI = environment.URLAPI;
  user: any = {};
  token: any = '';
  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    this.cargarToken();
   }

  login(body: {userWeb: string , password: string}){
    return this.http.post(`${this.URLAPI}/auth/loginTutor`, body).pipe(
      map((resp: any ) => {
        console.log('RESPUESTA', resp);
        if(resp.tutor){
        this.guardaUsuario(resp.tutor);
       }
       if(resp.maestro){
        this.guardaUsuario(resp.maestro);
        }
        this.guardaToken(resp.token);
        if ( resp) {
          this.navCtrl.navigateRoot('/tabs/tab2');
        } else {
          this.navCtrl.navigateRoot('/login');
        }
        return resp;
      })
    )
  }

  guardaToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }


  validaToken(): boolean {
    if(!!this.token && !!this.user){
      return true;
    }
    return false
  }



  guardaUsuario(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    console
  }

  async cargarToken() {
    this.token = await localStorage.getItem('token') || null;
    this.user = JSON.parse(localStorage.getItem('user')|| '{}')|| null;
  }

  getUserId(){
    const user = JSON.parse(localStorage.getItem('user') || '{}')|| null;
   if (user !== null) {
    console.log('user', user.id);
    return user.id
  } else {
    this.navCtrl.navigateRoot('/login');
  }
}
getUser(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')|| null;
 if (user !== null) {
  return user
} else {
  this.navCtrl.navigateRoot('/login');
}
}

getImagePerfil(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')|| null;
 if (user.fotoPerfil !== null) {
  console.log('user', user.fotoPerfil);
  return true;
} else {
  return false
}
}

post(ruta:string,data:any){
  return this.http.post(this.URLAPI+ruta,data)
}

getTipoUser(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')|| null;
  if (user !== null) {
   if(user.correo){
    console.log('user prubas', user.responsabilidad);
    if(user.responsabilidad === 'fila'){
      return 'FILA';
    }
    else if(user.responsabilidad === 'lector') {
      return 'LECTOR';
    }
    else if(user.responsabilidad === 'salon') {
      return 'MAESTRO';
    }
    else if(user.responsabilidad === 'entregar') {
      return 'ENTREGAR';
    }
   } else {
    return 'TUTOR'
   }
 }
 return null;
}

logout(){
  localStorage.clear();
  this.navCtrl.navigateRoot('/login');
}

modifyPerfil(img: any) {
  const user = JSON.parse(localStorage.getItem('user') || '{}')|| null;

  const newUser = { ...user, fotoPerfil : img };
  localStorage.setItem('user', JSON.stringify(newUser));
}

}

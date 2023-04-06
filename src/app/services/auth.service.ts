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
  user = {};
  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    console.log(this.user)
   }

  login(body: {userWeb: string , password: string}){
    return this.http.post(`${this.URLAPI}/auth/loginTutor`, body).pipe(
      map((resp: any ) => {
       // this.guardaToken(resp.token);
        this.guardaUsuario(resp.tutor);
        if ( resp) {
          this.navCtrl.navigateRoot('/tabs/tab2');
        } else {
          this.navCtrl.navigateRoot('/login');
        }
        return resp;
      })
    )
  }

  guardaUsuario(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
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
}

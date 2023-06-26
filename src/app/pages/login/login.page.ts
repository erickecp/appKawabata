import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EVENTS } from 'src/app/enums/sockets.enum';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin!: FormGroup;
  mostrarPassword = false;
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private alertS: AlertsService,
    private route: Router,
    private soccketS: SocketsService
  ) {

   }

  ngOnInit() {
    this.generateForm();
  }


  generateForm() {
    this.formLogin = this.fb.group({
      userWeb: ['', Validators.required],
       //userWeb: ['KW23003A', Validators.required],
     // password: ['9900', Validators.required]
      password: ['', Validators.required]
    });
  }


  submit(){
    console.log(this.formLogin.value);
    this.authS.login(this.formLogin.value).subscribe({
      next: (res: any) => {
        this.alertS.generateToastSuccess('Bienvenido');
        if(res.tutor){
          this.soccketS.emit(EVENTS.CONFIG_USER, {id: res.tutor.id, type: 'tutor'});
        }else {
          this.soccketS.emit(EVENTS.CONFIG_USER, {id: res.maestro.id,  type: 'maestro'});
        }
      },
      error: (err: any) => {
        this.alertS.generateToastError('Ocurrio un error'+ err.error.message)
      }
    }
          // this.alertS.generateToastError(err.error.message)

    );
    }
}

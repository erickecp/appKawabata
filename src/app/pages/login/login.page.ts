import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private route: Router
  ) { }

  ngOnInit() {
    this.generateForm()
  }


  generateForm() {
    this.formLogin = this.fb.group({
      userWeb: ['KW23003A', Validators.required],
      password: ['12345', Validators.required]
    });
  }


  submit(){
    console.log(this.formLogin.value);
    this.authS.login(this.formLogin.value).subscribe(
      resp => {
        console.log(resp)
      }, (err: any) => {
          this.alertS.generateToastError(err.error.message)
      }
    );
    }
}

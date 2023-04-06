import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
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
      }
    );
    }
}

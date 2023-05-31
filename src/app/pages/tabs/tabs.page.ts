import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user!: 'MAESTRO' | 'TUTOR' | 'FILA'| 'ENTREGAR' | 'LECTOR' | null;
  constructor(
    private authS: AuthService
  ) {
    this.user = this.authS.getTipoUser();
    console.log(this.user);
  }

}

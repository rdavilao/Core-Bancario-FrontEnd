import { Component, Input, OnChanges } from '@angular/core';
import { ConsultasLoginService } from 'src/app/services/consultas-login.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, ConsultasLoginService]
})
export class LoginComponent implements OnChanges {
  @Input() someInput: string;

  constructor(
    private loginService: LoginService,
    private consultasService: ConsultasLoginService,
  ) { }

  login(form): void {
    this.loginService.login(form.form.value.user, form.form.value.password).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        window.location.reload();
        this.consultasService.login().subscribe((resConsultas) =>
          localStorage.setItem('tokenConsultas', resConsultas.token)
        );
      }
    );
  }

  ngOnChanges(): void {
    console.log(this.someInput);
  }
}

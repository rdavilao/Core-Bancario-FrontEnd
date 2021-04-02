import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  token = localStorage.getItem('token');
  title = 'Core-Bancario-FrontEnd';
}

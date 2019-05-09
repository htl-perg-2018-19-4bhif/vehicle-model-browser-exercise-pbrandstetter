import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Vehicle Browser</h1>
    <button mat-fab routerLink='about'> About </button>&nbsp;
    <button mat-fab routerLink='models'> Models </button>
    <br><br>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'vehicle-browser';
}

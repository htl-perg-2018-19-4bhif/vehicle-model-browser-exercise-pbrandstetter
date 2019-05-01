import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Vehicle Browser</h1>
    <ul>
      <li>
        <a routerLink='models'>Models</a>
      </li>
      <li>
        <a routerLink='about'>About</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'vehicle-browser';
}

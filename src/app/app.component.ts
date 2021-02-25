import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Price Watcher';
  options = {
    fpsLimit: 60,
    particles: {
      color: {
        value: '#cbe5ff'
      },
      links: {
        enable: true,
        color: '#cbe5ff'
      },
      move: {
        enable: true
      }
    }
  };
}

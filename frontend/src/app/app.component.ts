import { Component, signal } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    TuiRoot,
    TuiAccordion,
    TuiIcon,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css',
})
export class AppComponent {
  // routes object
  routes = signal([
    {
      title: 'Dashboard',
      icon: 'layout-dashboard',
      link: '/',
    },
    {
      title: 'Rooms',
      icon: 'bed-single',
      link: '/rooms',
    },
    {
      title: 'Guests',
      icon: 'users',
      link: '/guests',
    },
    {
      title: 'Reservations',
      icon: 'calendar-fold',
      link: '/reservations',
    },
  ]);
}

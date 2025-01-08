import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'rooms',
    loadComponent: () =>
      import('./components/rooms/rooms.component').then(
        (m) => m.RoomsComponent
      ),
  },
  {
    path: 'guests',
    loadComponent: () =>
      import('./components/guests/guests.component').then(
        (m) => m.GuestsComponent
      ),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./components/reservations/reservations.component').then(
        (m) => m.ReservationsComponent
      ),
  },
];

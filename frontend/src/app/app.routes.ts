import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { GuestsComponent } from './components/guests/guests.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'guests',
    component: GuestsComponent,
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
  },
];

import { Routes } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { GuestsComponent } from './components/guests/guests.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'reservations', component: ReservationsComponent },
];

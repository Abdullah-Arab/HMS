import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { GuestsComponent } from './components/guests/guests.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { NewRoomComponent } from './components/rooms/new-room/new-room.component';
import { GuestDetailsComponent } from './components/guests/guest-details/guest-details.component';
import { NewGuestComponent } from './components/guests/new-guest/new-guest.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // component: DashboardComponent,
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'rooms',
    // component: RoomsComponent,

    children: [
      {
        path: '',
        component: RoomsComponent,
      },
      {
        path: 'new-room',
        component: NewRoomComponent,
      },
      {
        path: ':id',
        component: RoomDetailsComponent,
      },
    ],
  },
  {
    path: 'guests',
    // component: GuestsComponent,
    children: [
      {
        path: '',
        component: GuestsComponent,
      },
      {
        path: 'new-guest',
        component: NewGuestComponent,
      },
      {
        path: ':id',
        component: GuestDetailsComponent,
      },
    ],
  },
  {
    path: 'reservations',
    // component: ReservationsComponent,
    loadComponent: () =>
      import('./components/reservations/reservations.component').then(
        (m) => m.ReservationsComponent
      ),
  },

  // { path: '**', component: PageNotFoundComponent }
];

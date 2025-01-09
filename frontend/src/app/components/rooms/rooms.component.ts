import Room from '../../../types/room';
import ApiResponse from '../../../types/api-response';
import { RoomService } from './../../services/room.service';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  rooms = signal<Room[]>([]);
  roomService: RoomService = inject(RoomService);

  constructor() {}

  ngOnInit() {
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        console.log('Rooms fetched', rooms);
        this.rooms.set(rooms.data);
      },
      error: (error) => {
        console.error('Error fetching rooms', error);
      },
      complete: () => {
        console.log('Rooms fetch complete');
      },
    });
  }
}

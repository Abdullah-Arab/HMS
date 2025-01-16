  // id: Type.String(),
  // guest_id: Type.String(),
  // room_ids: Type.Array(Type.String()),
  // checkin_date: Type.String(),
  // checkout_date: Type.String(),
  // status: Type.String(),
  // createdAt: Type.String(),
  // updatedAt: Type.String(),

import Guest from "./guest";
import Room from "./room";


type Reservation = {
  id: number;
  guest: Guest;
  room: Room[];
  checkin_date: string;
  checkout_date: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Reservation;

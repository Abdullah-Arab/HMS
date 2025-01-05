export default interface Reservation {
    id: string;
    guest_id: string;
    room_ids: string[];
    checkin_date: string;
    checkout_date: string;
    createdAt: string;
    updatedAt: string;
}
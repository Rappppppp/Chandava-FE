import { Accomodation } from "./accomodationType";


export interface MyBooking {
    id: number,
    user_id: number,
    room_id: number,
    no_guests: number,
    check_in: string,
    check_out: string,
    tour_type: string,
    total_price: string,
    status: string,
    receipt: string,
    admin_note: string,
    room: Accomodation

 }
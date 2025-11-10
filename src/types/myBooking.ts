import { Accomodation } from "./accomodationType";

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    contact_number: string,
    address: string,
    
}

export interface Feedback {
    id: number,
    user_id: number,
    room_id: number,
    rate: number,
    comment: string,
    images: string[]
}


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
    room: Accomodation,
    user: User
    feedback?: Feedback
 }
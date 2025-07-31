export interface AccomodationType {
    id: number,
    accommodation_type_name: string
}

export interface RoomInclusions {
    id: number,
    inclusion_name: string
}

export interface RoomImage {
    id: number,
    file: string,
    is_main_image: boolean
}

export interface Accomodation {
    id: number,
    room_name: string,
    description: string,
    day_night_tour_price: string,
    overnight_price: string,
    notes: string | null,
    is_already_check_in: boolean,
    accommodation_type: AccomodationType,
    room_inclusions: RoomInclusions[],
    room_images: RoomImage[]

}



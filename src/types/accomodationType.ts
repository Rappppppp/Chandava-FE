export interface AccomodationType {
    id: number,
    accommodation_type_name: string
    max_guests: number
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

export interface Reviewer {
    id: number,
    name: string,
}

export interface FeedbackImage {
    id: number,
    image: string,
}

interface Response {
    id: number,
    feedback_id: number,
    response: string,
    created_at: string,
    updated_at: string,
}

export interface Feedback {
    id: number,
    user_id: number,
    room_id: number,
    rate: number,
    comment: string,
    images: FeedbackImage[]
    user: Reviewer,
    response: Response | null,
    created_at: string
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
    room_images: RoomImage[],
    feedbacks: Feedback[]
    avg_rating: string | number | null
}



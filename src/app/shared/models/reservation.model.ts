import Participant from './participant.model';

export default class Reservation {
    reservation_id: number
    user_id: string;
    room_code: string;
    description: string;
    start_time: Date;
    end_time: Date;

    date: string;
    begin: string;
    end: string;
}

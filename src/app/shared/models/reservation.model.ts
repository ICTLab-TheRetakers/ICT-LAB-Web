import Participant from './participant.model';

export default class Reservation {
    user_id: string;
    room_code: string;
    description: string;
    start_time: Date;
    end_time: Date;

    date: Date;
    begin: string;
    end: string;
}

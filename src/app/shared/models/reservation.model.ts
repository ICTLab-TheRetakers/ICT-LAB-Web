import Participant from './participant.model';

export default class Reservation {
    room_code: string;
    start_time: Date;
    end_time: Date;
    user_id: string;
}

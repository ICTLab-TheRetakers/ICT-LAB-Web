import Participant from './participant.model';

export default class Reservation {
    room_code: string;
    start_time: string;
    end_time: string;
    user_id: string;
    participants: Participant[];

    constructor(room_code: string, start_time: string, end_time: string, user_id: string, participants: Participant[]) {

        this.room_code = room_code;
        this.start_time = start_time;
        this.end_time = end_time;
        this.user_id = user_id;
        this.participants = participants;
    }
}

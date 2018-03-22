export default class Participant {
    user_id: string;
    room_code: string;
    start_time: string;

    constructor(user_id: string, room_code: string, start_time: string) {

        this.room_code = room_code;
        this.user_id = user_id;
        this.start_time = start_time;
    }
}

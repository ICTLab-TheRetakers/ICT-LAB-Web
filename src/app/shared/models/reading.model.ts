export default class Roomreading {
    room_code: string;
    created_on: string;
    type: string;
    value: number;

    constructor(room_code: string, created_on: string, type: string, value: number) {

        this.room_code = room_code;
        this.created_on = created_on;
        this.type = type;
        this.value = value;
    }
}

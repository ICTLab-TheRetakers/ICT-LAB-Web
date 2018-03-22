export default class Device {
    device_id: number;
    room_code: string;

    constructor(device_id: number, room_code: string) {

        this.device_id = device_id;
        this.room_code = room_code;
    }
}

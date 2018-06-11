export default class Roomreading {
    device_id: number;
    created_on: string;
    type: string;
    value: number;

    constructor(device_id: number, created_on: string, type: string, value: number) {

        this.device_id = device_id;
        this.created_on = created_on;
        this.type = type;
        this.value = value;
    }
}

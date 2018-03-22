export default class Role {
    role_id: number;
    type: string;

    constructor(role_id: number, type: string) {

        this.role_id = role_id;
        this.type = type;
    }
}

export default class User {
    user_id: string;
    role_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;

    constructor(user_id: string, role_id: number, first_name: string,
        last_name: string, email: string, password: string) {

        this.user_id = user_id;
        this.role_id = role_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

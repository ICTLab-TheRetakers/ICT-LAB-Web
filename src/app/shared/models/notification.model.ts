export default class Notification {
    notification_id: number;
    user_id: string;
    created_on: string;
    description: string;

    constructor(notification_id: number, user_id: string, created_on: string, description: string) {

        this.notification_id = notification_id;
        this.user_id = user_id;
        this.created_on = created_on;
        this.description = description;
    }
}

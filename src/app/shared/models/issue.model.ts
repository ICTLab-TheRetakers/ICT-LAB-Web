export default class Issue {
    issue_id: number;
    room_code: string;
    created_on: string;
    description: string;
    resolved: boolean;

    constructor(issue_id: number, room_code: string, created_on: string, description: string, resolved: boolean) {

        this.issue_id = issue_id;
        this.room_code = room_code;
        this.created_on = created_on;
        this.description = description;
        this.resolved = resolved;
    }
}

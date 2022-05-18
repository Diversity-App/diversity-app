export class ApiError {
    public status;
    public message;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class User {
    constructor(
        public email: string,
        public password: string,
        private token: string
    ) {}

    get tokenFunc(): string {
        return this.token;
    }
}

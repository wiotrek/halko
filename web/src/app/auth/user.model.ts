export class User {
    constructor(
        private login: string,
        private role: string,
        private pointNames: string[],
        private token: string,
    ) {}

    get tokenFunc(): string {
        return this.token;
    }

    get displayName(): string {
        return this.role === 'Admin'
        ? 'Admin'
        : this.pointNames[0];
    }

    get pointName(): string {
        return this.pointNames[0];
    }

    get loginFunc(): string {
        return this.login;
    }
}

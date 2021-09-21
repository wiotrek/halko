export class User {
    constructor(
        private login: string,
        private role: string,
        private pointNames: string[],
        private token: string,
        private tokenExpirationDate: Date
    ) {}

    get tokenFunc(): string {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
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

    get pointList(): string[] {
        return this.pointNames;
    }

    get showRole(): string {
        return this.role;
    }
}

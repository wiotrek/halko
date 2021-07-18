export class User {
    constructor(
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
}

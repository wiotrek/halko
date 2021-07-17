export class User {
    constructor(
        public pointNames: string[],
        public role: string,
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

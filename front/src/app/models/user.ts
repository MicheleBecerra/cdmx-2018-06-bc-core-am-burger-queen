export class User {
    constructor(
        public _id: string,
        public name: string,
        public role: string,
        public email: string,
        public password: string,
        public image: string
    ) {}
}


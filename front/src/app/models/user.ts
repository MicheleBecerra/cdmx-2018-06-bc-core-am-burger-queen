export class User {
    construsctor(
        public _id: string,
        public name: string,
        public role: string,
        public email: string,
        public password: string,
        public image: string
    ) {}
}

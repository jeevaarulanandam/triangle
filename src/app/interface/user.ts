// export interface User {
//     firstname?: string;
//     lastname?: string;
//     address?: string;
//     city?: string;
//     state?: string;
//     postalcode?: string;
// }

export class User {
    constructor(
        public username?: string,
        public password?: string,
        public firstName?: string,
        public lastName?: string,
        public role?: string,
        public address?: string,
        public city?: string,
        public state?: string,
        public postalcode?: string
    ) { }
}

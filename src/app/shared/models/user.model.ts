export class User {
    constructor(
        public email:string,
        public id:string,
        private _token:string, 
        private _tokenExpirationDate:Date) {}
    get token() {
        // there must be an expiration date and , the tokenExpirationDate must be bigger that current date
        if (!this._tokenExpirationDate ||  new Date()> this._tokenExpirationDate) {
            return null;
        }
        return this._token
    }
}
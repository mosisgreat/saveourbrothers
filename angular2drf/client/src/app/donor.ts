export class Donor {

  constructor(
    public user: User,
    public phone: string,
    public type?: string
  ) { }

}

export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
    ){ }
}
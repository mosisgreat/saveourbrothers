export class Seeker {
 constructor(
    public id: number,
    public user: User,
    public priority: number,
    public photo: string,
    public phone: string,
    public addresses: Address,
    public raised_amount: number,
    public target_amount: number,
    public description: string,
    public deadline: string
  ) {  }
}

export class Address {
    constructor(
        public region: string,
        public city: string,
        public flat: string
    ){ }
}

export class User {
    constructor(
        public first_name: string,
        public last_name: string,
    ){ }
}

//  public description?: string,   ? == optional param
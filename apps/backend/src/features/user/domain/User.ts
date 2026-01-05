type UserPrimitives = {
  email: string;
  name: string;
  isBanned: boolean;
};

export class User {
  public readonly id: string;
  public readonly email: string;
  public name: string;
  public isBanned: boolean;

  private constructor(params: UserPrimitives & { id: string }) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.isBanned = params.isBanned;
  }

  /** Factory method to create a new User instance. */
  static create(primitives: UserPrimitives): User {
    const id = crypto.randomUUID();
    return new User({ id, ...primitives });
  }

  /** Factory method to create a User instance from persistence. */
  static fromPersistence(params: UserPrimitives & { id: string }): User {
    return new User(params);
  }

  ban() {
    this.isBanned = true;
  }

  unban() {
    this.isBanned = false;
  }
}

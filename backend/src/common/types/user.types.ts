export interface CreateUserAttributes {
  username: string;
  password: string;
}

export interface ClientUser {
  username: string;
  id: number;
}

export interface DatabaseUser extends ClientUser {
  password: string;
}

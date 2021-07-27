export interface User {
  username: string;
}

export interface ServerUser extends User {
  userId: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface User {
  username: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserInDB extends UserWithPassword {
  userId: number;
}

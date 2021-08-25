interface User {
  username: string;
}

export interface ServerUser extends User {
  id: string;
}

export interface CreateUserProps extends User {
  password: string;
}

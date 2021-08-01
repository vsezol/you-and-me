import { CreateUserAttributes } from '../../common';

export class CreateUserDto implements Readonly<CreateUserAttributes> {
  readonly username: string;
  readonly password: string;
}

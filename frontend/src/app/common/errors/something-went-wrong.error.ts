interface Props {
  message?: string;
  status?: number;
}

export class SomethingWentWrongError extends Error {
  public status: number;

  constructor({ message = 'Something went wrong', status = 0 }: Props) {
    super(message);
    this.status = status;
  }
}

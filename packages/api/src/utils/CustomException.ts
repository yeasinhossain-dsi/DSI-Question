export class CustomException extends Error {
  status: any;
  name: string;
  constructor(message, status) {
    super(message);
    this.name = 'Custom Exception';
    this.status = status;
  }
}

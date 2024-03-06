class Client {
  constructor(name: string, address: string) {
    this._name = name;
    this._address = address;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _address: string;

  get address(): string {
    return this._address;
  }
}

export default Client;

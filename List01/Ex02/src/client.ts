class Client {
  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _age: number;

  get age(): number {
    return this._age;
  }
}

export default Client;

import User from "./user";

class Book {
  public isLent: boolean;
  public lentTo: User | null;

  constructor(title: string, author: string, year: number) {
    this._title = title;
    this._author = author;
    this._year = year;
    this.isLent = false;
    this.lentTo = null;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  private _author: string;

  get author(): string {
    return this._author;
  }

  private _year: number;

  get year(): number {
    return this._year;
  }
}

export default Book;

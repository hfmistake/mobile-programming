class Movie {
  constructor(title: string, genre: string, duration: number) {
    this._title = title;
    this._genre = genre;
    this._duration = duration;
  }

  private _genre: string;

  get genre(): string {
    return this._genre;
  }

  private _duration: number;

  get duration(): number {
    return this._duration;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }
}

export default Movie;

import Movie from "./movie";
import Client from "./client";

class Rental {
  rented_movies: Movie[] = [];
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  rentMovie(movie: Movie): void {
    this.rented_movies.push(movie);
    console.log(`The movie ${movie.title} was rented by ${this.client.name}`);
  }

  showRentedMovies(): void {
    console.log(`The movies rented by ${this.client.name} are:`);
    this.rented_movies.forEach((movie) => {
      console.log(movie.title);
    });
  }
}

export default Rental;

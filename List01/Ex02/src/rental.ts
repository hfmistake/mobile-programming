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
    console.log(
      `O filme ${movie.title} foi alugado para o cliente ${this.client.name}`,
    );
  }

  showRentedMovies(): void {
    console.log(`Os filmes alugados por ${this.client.name} são:`);
    this.rented_movies.forEach((movie) => {
      console.log(movie.title);
    });
  }
}

export default Rental;

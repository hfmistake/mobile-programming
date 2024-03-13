import Client from "./client";
import Movie from "./movie";
import Rental from "./rental";

const client = new Client("John Doe", 25);
const movie1 = new Movie("The Godfather", "Crime", 175);
const movie2 = new Movie("The Shawshank Redemption", "Drama", 142);
const movie3 = new Movie("The Dark Knight", "Action", 152);

const rental = new Rental(client);

rental.rentMovie(movie1);
rental.rentMovie(movie3);

rental.showRentedMovies();

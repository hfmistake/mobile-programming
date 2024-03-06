import Book from "./book";
import User from "./user";
import Library from "./library";

const book1 = new Book("O Senhor dos Anéis", "J.R.R. Tolkien", 1954);
const book2 = new Book("A Game of Thrones", "George R.R. Martin", 1996);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 1937);
const book4 = new Book("The Catcher in the Rye", "J.D. Salinger", 1951);
const book5 = new Book("1984", "George Orwell", 1949);

const user1 = new User("João", 25);
const user2 = new User("Maria", 30);
const user3 = new User("José", 20);
const user4 = new User("Ana", 35);
const user5 = new User("Carlos", 40);

const library = new Library();

library.addUser(user1);
library.addUser(user2);
library.addUser(user3);
library.addUser(user4);
library.addUser(user5);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);

library.lendBook(book1, user1);
library.lendBook(book2, user2);
library.lendBook(book3, user3);
library.lendBook(book4, user4);
library.lendBook(book5, user5);

library.lendBook(book1, user2);
library.returnBook(book1, user1);
library.lendBook(book1, user2);

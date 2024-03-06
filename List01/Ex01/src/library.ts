import User from "./user";
import Book from "./book";

class Library {
  users: User[] = [];
  books: Book[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  lendBook(book: Book, user: User): void {
    if (book.isLent) {
      console.error("Livro já emprestado");
    }
    if (!this.users.includes(user) || !this.books.includes(book)) {
      console.error("Usuário ou livro não cadastrado");
    }
    book.isLent = true;
    book.lentTo = user;
    console.log(`${user.name} pegou emprestado o livro ${book.title}`);
  }

  returnBook(book: Book, user: User): void {
    if (!book.isLent) {
      console.error("O livro não está emprestado");
    }
    if (book.lentTo !== user) {
      console.error("O livro não foi emprestado para este usuário");
    }
    book.isLent = false;
    book.lentTo = null;
    console.log(`${user.name} devolveu o livro ${book.title}`);
  }
}

export default Library;

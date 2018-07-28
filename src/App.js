import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import AddBooks from './AddBooks.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import shelves from './shelves';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  /*
    - Update the shelf of the book which is selected from the main or the search page.
    - Add book if it's not exist in the current book list
    - Doing this will enhance the performance of the app rather than getting the data again from the server!!
  */
  updateBooks = (book, shelf, bookArr) => {
    let bookIndex = bookArr.findIndex(item => item.id == book.id);
    if (bookIndex < 0) {
      bookArr.push(book);
      bookIndex = bookArr.length - 1;
    }
    bookArr[bookIndex].shelf = shelf;
    return bookArr;
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf) // Update books shelf and sync it with the local book list.
    this.setState((prevState) => ({
      books: this.updateBooks(book, shelf, prevState.books),
    }))
    //this.getAllBooks(); // This can be used instead of updating the book list locally.
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelf => (
                  <BookShelf key={shelf.code} onBookMove={this.moveBook} shelfTitle={shelf.title} books={this.state.books.filter((b) => b.shelf == shelf.code)} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route exact path='/search' render={() => (
          <AddBooks onBookMove={this.moveBook} queryVal={this.state.query} allBooks={this.state.books} />
        )} />

      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import AddBooks from './AddBooks.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  /*
    - Update the shelf of the book which is selected from the main or the search page.
  */
  updateBooks = (book, shelf, bookArr) => {
    return bookArr.map(element => {
      if (element.id == book.id) {
        element.shelf = shelf;
      }
      return element;
    });
  }

  moveBook = (book, shelf) => {
    this.setState((prevState) => ({
      books: this.updateBooks(book, shelf, prevState.books),
      searchedBooks: this.updateBooks(book, shelf, prevState.searchedBooks)
    }))
    BooksAPI.update(book, shelf);
  }

  /*
    - Search the book and get the result then update the state.
    - Check from the search book result with the books which already on tha main page.
    - Update the book from the search page with the correct shelf from the main page.
  */
  search = (query) => {
    BooksAPI.search(query).then((searchedBooks) => {
      this.setState((prevState) => ({
        searchedBooks: searchedBooks.map(bookElement => {
          let shelfBookIndex = prevState.books.findIndex(item => item.id == bookElement.id);
          if (shelfBookIndex >= 0) {
            bookElement.shelf = prevState.books[shelfBookIndex].shelf;
          }
          return bookElement;
        })
      }));
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <AddBooks onBookMove={this.moveBook} books={this.state.searchedBooks} onSearchQueryChange={this.search} />
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf onBookMove={this.moveBook} shelfTitle='Currently Reading' books={this.state.books.filter((b) => b.shelf == 'currentlyReading')} />
                  <BookShelf onBookMove={this.moveBook} shelfTitle='Want to Read' books={this.state.books.filter((b) => b.shelf == 'wantToRead')} />
                  <BookShelf onBookMove={this.moveBook} shelfTitle='Read' books={this.state.books.filter((b) => b.shelf == 'read')} />
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp

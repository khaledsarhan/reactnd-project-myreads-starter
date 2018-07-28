import React from 'react'
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class AddBooks extends React.Component {
  state = {
    searchResult: [],
    query: ''
  }

  handleQueryChange = (query) => {
    this.setState({ query });
    this.search(query);
  }

  mergeShelf = (allBooks, newBooks) => {
    if (newBooks && newBooks.length > 0) {
      newBooks = newBooks.map(bookElement => {
        let shelfBookIndex = allBooks.findIndex(item => item.id == bookElement.id);
        if (shelfBookIndex >= 0) {
          bookElement.shelf = allBooks[shelfBookIndex].shelf;
        }
        return bookElement;
      })
    }
  }

  /*
    - Search the book and get the result then update the state.
    - Check from the search book result with the books which already on tha main page.
    - Update the book from the search page with the correct shelf from the main page.
  */
  search = (query) => {
    query = query.trim();
    if (query.length <= 0) {
      this.setState({ searchResult: [] })
      return;
    }

    BooksAPI.search(query).then((searchResult) => {
      if (searchResult && !searchResult.hasOwnProperty('error') && searchResult.length > 0) {
        this.setState({ searchResult })
      } else {
        this.setState({ searchResult: [] });
      }
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="search-books">
        {this.mergeShelf(this.props.allBooks, this.state.searchResult)}
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.handleQueryChange(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <BookShelf onBookMove={this.props.onBookMove} shelfTitle='' books={this.state.searchResult} />
        </div>
      </div>
    )
  }
}

export default AddBooks

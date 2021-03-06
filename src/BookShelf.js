import React from 'react'
import './App.css'
import shelves from './shelves';

class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                {this.props.shelfTitle && <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>}
                <div className="bookshelf-books">
                    {(this.props.books && this.props.books.length > 0) ? (
                        <ol className="books-grid">
                            {this.props.books.map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>}
                                            <div className="book-shelf-changer">
                                                <select className="option-selected" value={book.shelf ? book.shelf : 'none'} onChange={(target) => this.props.onBookMove(book, target.currentTarget.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    {shelves.map(shelf => (
                                                        <option key={shelf.code} value={shelf.code}>{shelf.title}</option>
                                                    ))}
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {(book.authors && book.authors.length > 0) && book.authors.map((author, index) => (
                                            <div className="book-authors" key={index}>{author}</div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                            <div className="empty">
                                <p>There is no books here</p>
                            </div>
                        )}

                </div>
            </div>
        )
    }
}

export default BookShelf

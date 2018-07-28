# MyReads Project

This is _MyReads project, one of the **Udacity** front end web development nanodegree projects.

# Definition

MyReads application is helping the user to manage his book list by categorizing it into shelves. User can add books, change it's shelf or remove it at all.

## Queck Start

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`
* with your server running, visit the site: http://localhost:3000 if not open automatically

## Main files

There are main files which can help to start understand the scenario of the code

## What You're Getting
```bash
 src
    ├── AddBooks.js # This is the page which the user can use to search and add books ot his list. 
                    # This file has two main parts, the input field and the BookShelf component which will contain the search result.
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app.
               # This file has two routes, one for the AddBooks compnent and another one is the main route which     include all types of shelves.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── BookShelf.js # This is the book shelf component which includes information like shelf title, books and all                    the actions needed to be appling over all the books.
    ├── index.css # Global styles.
    ├── index.js # It is used for DOM rendering only.
    └── shelves.js # This is a global variable which holds the type of shelves (currently reading, want to read,                    read). It's used to dynamically load the shelves in the main application.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)
'

## Main React Components Structure

```bash
<App />
  <Header />
  <BookDetails />

  <!-- Main page with <Route /> path='/' -->
  
    <BookShelves>
        <Bookshelf />
        <Bookshelf />
        .
        .
    </BookShelves>
    <OpenSearch />

  <!-- Search page <Route /> path='/search' -->
    <AddBook>
        <Search input />
        <Search result />
    </AddBook>
  <Footer />
```
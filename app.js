var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var booksRouter = require('./routes/books');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/books', booksRouter);

//404 error handler
app.use((req, res, next) =>{
  const err= new Error();
  err.status = 404;
  err.message = 'looks like the page you requested does not exist'
  console.error(err.message)
  next(err)
})

//global error handler
app.use((err, req, res, next) =>{

  if (err.status === 404){
      res.status(404).render('page-not-found', { error: err })
  } else {
      err.message =  'Whoops, seems that something went wrong,';
      console.error(err.message)
      res.status(err.status || 500).render('error', { error: err })
  }
});

// database connection: 
const { sequelize } = require('./models');
const {Book}  = sequelize.models;

(async () => {
  await sequelize.sync({ force: true });

  try {
    const Instances = await Promise.all([
      Book.create({
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          genre: 'Non Fiction',
          year: 1988,
        }),
      Book.create({
        title: 'Armada',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2015,
        }),
      Book.create({
        title: 'Emma',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1815,
        }),
      Book.create({
        title: 'Frankenstein',
        author: 'Mary Shelley',
        genre: 'Horror',
        year: 1818,
      }),
      Book.create({
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Deathly Hallows',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Goblet of Fire',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Half-Blood Prince',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Philosophers Stone',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        year: 1998,
      }),
      Book.create({
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Classic',
        year: 1813,
      }),
      Book.create({
        title: 'Ready Player One',
        author: 'Ernest Cline',
        genre: 'Science Fiction',
        year: 2011,
      }),
      Book.create({
        title: 'The Martian',
        author: 'Andy Wei',
        genre: 'Science Fiction',
        year: 2014,
      }),
      Book.create({
        title: 'The Universe in a Nutshell',
        author: 'Stephen Hawking',
        genre: 'Non Fiction',
        year: 2001,
      }),


    ]); 

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);      
    } else {
      throw error;
    } 
  }
})();


module.exports = app;

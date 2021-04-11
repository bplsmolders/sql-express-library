var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const {Book}  = sequelize.models;
const { Op } = sequelize.Sequelize;


/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* Underneath pages both goes to the first page of all books */
router.get('/', (req, res, next) => {
  res.redirect("/books/page/1")
});

router.get('/books', (req, res, next) => {
  res.redirect("/books/page/1")
});


/* Shows partial list of books based on pagination*/
router.get('/books/page/:page', asyncHandler(async (req, res) => {
  let page = req.params.page
  let amountPerPage = 5
  let offset = (page-1) * amountPerPage;

  const pageBooks = await Book.findAll({
    offset,
    limit: amountPerPage
  });
  const allBooks = await Book.findAll({});


  amountOfPages= Math.ceil(allBooks.length / amountPerPage);
  res.render('index', {amountOfPages, search: {}, title: 'Books', pageBooks })
}));

/* Applies filter on books when Searched. */
router.post('/books', asyncHandler(async (req, res) => {
  let searchterm = req.body.search;
  const books = await Book.findAll({
    where: {
      [Op.or]:[
          {  
            title: {
                  [Op.substring]: searchterm
            }
          },
          { 
            author: {
              [Op.substring]: searchterm
            }, 
          },
          { 
            genre: {
              [Op.substring]: searchterm
            }, 
          },
          { 
            year: {
              [Op.substring]: searchterm
            }, 
          }
      ]
    }
  })
  res.render('searchresults', {search: {}, title: 'Books', books})
  res.json(search)
}));

/* shows the create new book form. */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book', {book: {}, title: "New Book"});
}));

/* Posts a new book to the database. */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/page/1");
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors, title: "New Book" })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }  
  }
}));

/* Shows book update form. */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("update-book", { book, title: book.title })
  } else {
    res.sendStatus(404);
  }
}));

/* Updates book info in the database. */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books/page/1"); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Books.build(req.body);
      book.id = req.params.id; // makes sure correct book gets updated
      res.render("update-book", { book, errors: error.errors, title: "Edit Article" })
    } else {
      throw error;
    }
  }
}));

/* Deletes a book out of the database */
router.get('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete", { book, title: "Delete Book" });
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual article. */
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));


module.exports = router;

// var express = require('express');
// var router = express.Router();
// const { sequelize } = require('../models');
// const {Book}  = sequelize.models;


// /* Handler function to wrap each route. */
// function asyncHandler(cb){
//   return async(req, res, next) => {
//     try {
//       await cb(req, res, next)
//     } catch(error){
//       // Forward error to the global error handler
//       next(error);
//     }
//   }
// }

// /* shows the full list of books */
// router.get('/books', asyncHandler(async (req, res) => {
//     const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]] })
//     res.render('all-books', {title: 'Books', books})
//       // res.json(books)
//   }));
  
//   /* shows the create new book form. */
//   router.get('/books/new', asyncHandler(async (req, res) => {
//     res.render('new-book', {book: {}, title: "New Book"});
//   }));
  
//   // /* Posts a new book to the database. */
//   router.post('/', asyncHandler(async (req, res) => {
//     let book;
//     console.log(req.body)
//     try {
//       book = await Book.create(req.body);
//       res.redirect("/book/" + book.id);
//     } catch (error) {
//       if(error.name === "SequelizeValidationError") { // checking the error
//         book = await Book.build(req.body);
//         res.render("new-book", { book, errors: error.errors, title: "New Book" })
//       } else {
//         throw error; // error caught in the asyncHandler's catch block
//       }  
//     }
//   }));
  
//   /* Shows book update form. */
//   router.get('/books/:id', asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if(book){
//       res.render("update-book", { book, title: book.title })
//     } else {
//       res.sendStatus(404);
//     }
//   }));
  
//   // /* Updates book info in the database. */
//   router.post('/books/:id', asyncHandler(async (req, res) => {
//     let book;
//     try {
//       book = await Book.findByPk(req.params.id);
//       if(book) {
//         await book.update(req.body);
//         res.redirect("/books/" + book.id); 
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (error) {
//       if(error.name === "SequelizeValidationError") {
//         book = await Books.build(req.body);
//         book.id = req.params.id; // makes sure correct book gets updated
//         res.render("update-book", { book, errors: error.errors, title: "Edit Article" })
//       } else {
//         throw error;
//       }
//     }
//   }));
  
//   // /* Deletes a book out of the database */
//   // router.post('/books/:id/delete', asyncHandler(async (req, res) => {
//   //   const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]] })
//   //   res.json(books)
//   // }));
  
// module.exports = router;

var express = require('express');
var router = express.Router();

const Book = require('../models/Book');

const isLoggedIn = require('../middleware/isLoggedIn');
const isOwner = require('../middleware/isOwner')


// ALL THE ROUTES
//ALL BOOKS (GET)
router.get('/', (req, res, next) => {

    Book.find()
        .populate('owner')
        .then((foundBooks) => {
            res.render('books/all-books.hbs', { books: foundBooks })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

});


//ADDING A NEW BOOK (GET)
router.get('/create', isLoggedIn, (req, res, next) => {
    res.render('books/create-book.hbs')
})

//ADDING A NEW BOOK (POST)
router.post('/create', isLoggedIn, (req, res, next) => {

    const { imageUrl, link, title, author, genre, parts, concluded, description } = req.body

    Book.create({
        imageUrl,
        link,
        title,
        author,
        genre,
        parts,
        concluded,
        description
    })
        .then((createdBook) => {
            console.log("Created Book:", createdBook)
            res.redirect('/books')
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })

})


module.exports = router;

//BOOKS DETAILS (GET)

router.get('/details/:bookId', (req, res, next) => {

    Book.findById(req.params.bookId)
        .then((book) => {
            console.log("Found book:", book)
            res.render('books/book-details.hbs', book)
        })
        .catch((error) => {
            console.log(error)
            next(error)
        })
})

//EDIT BOOK (GET)

router.get('/edit/:bookId', (req, res, next) => {
    const { bookId } = req.params;
   
    Book.findById(bookId)
      .then(bookToEdit => {
        console.log(bookToEdit);
        res.render("books/edit-book.hbs", bookToEdit)
      })
      .catch(error => next(error));
  });


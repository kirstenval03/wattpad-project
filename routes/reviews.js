var express = require('express');
var router = express.Router();

const Review = require('../models/Review');
const Book = require('../models/Book');

const isLoggedIn = require('../middleware/isLoggedIn')
const isNotOwner = require('../middleware/isNotOwner')

router.post('/add-review/:ownerId/:bookId', isLoggedIn, isNotOwner, (req, res, next) => {

    Review.create({
        user: req.session.user._id,
        comment: req.body.comment
    })
    .then((newReview) => {
        console.log("New review", newReview)
        return Book.findByIdAndUpdate(
            req.params.bookId,
            {
                $push: {reviews: newReview._id}
            },
            {new: true}
        )
    })
    .then((updatedBook) => {
        console.log("Updated book", updatedBook)
        res.redirect(`/books/details/${updatedBook._id}`)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

})

module.exports = router;
const Book = require('../models/Book')

const isOwner = (req, res, next) => {

    Book.findById(req.params.bookId)
    .populate('owner')
    .then((foundBook) => {
        if(foundBook.owner._id.toString() === req.session.user._id) {
            next()
        } else {
            res.redirect('/books')
        }
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

}

module.exports = isOwner
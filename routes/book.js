const router = require('express').Router();
let Book = require('../models/bookList.model');


router.route('/book').get((req, res) => {
    const query = req.query.q;
    Book.find()
        .then((auctions) => res.json(auctions))
        .catch((err) => res.status(400).json('Error: ' + err));

});

router.route('/book/:id').get((req, res) => {
    console.log('just id' + req.params.id);
    Book.findById(req.params.id)
      .then((activity) => res.json(activity))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/book').post(async (req, res) => {
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const description = req.body.description;
 
    const newBook = await new Book({
        bookTitle, bookAuthor, description
    });
    console.log(newBook);
    
    newBook
        .save()
        .then(() => res.json('Book added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});


router.route('/book/:id').put(async (req, res) => {
    
  await  Book.findById(req.params.id)
      .then((bookforedit) => {
        bookforedit.bookTitle = req.body.bookTitle;
        bookforedit.bookAuthor = req.body.bookAuthor;
        bookforedit.description = req.body.description;
        bookforedit
          .save()
          .then(() => res.json('Book updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  

router.route('/book/:id').delete(async (req, res) => {
 
  await Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  


module.exports = router;
const express = require('express');
const router = express.Router();
const Book = require('../model/Book');

router.get('/', async( req, res ) => {
   try {
       const allBooks =  await Book.find();
       res.json(allBooks);
   } catch ( err ) {
       res.json({ message: err});
   }
});

router.post('/', async ( req, res ) => {
     console.log( req.body );
     const myBook = new Book( { title: req.body.title, publisher: req.body.publisher } );
     try {
         const saved = await myBook.save();
         res.json(saved);
     } catch( err ) {
         res.json({message: err});
     }
});

router.delete('/:bookid', async ( req, res ) => {
    try {
        const deletedBook = await Book.deleteOne({_id: req.params.bookid});
        res.json({deletedBook});
    } catch( err ) {
        res.json({message: err});
    }
});



module.exports = router;

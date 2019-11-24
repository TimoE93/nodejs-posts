const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch(err){
        res.json({message: err});
    }
});

router.get('/today', async ( req, res ) => {
    try{
        const todaysDate = new Date();
        const todaysDateZero = todaysDate.setHours(0,0,0,0,);
        const todaysDateMidnight = todaysDate.setHours(23,59,59 );
        const todaysPosts = await Post.find({ date: { $gte: todaysDateZero, $lte: todaysDateMidnight} });
        res.json(todaysPosts);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async ( req, res ) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    const savedPost = await post.save();
    try{
        res.json(savedPost);
    } catch(err){
        res.json({message: err});
    }
});

router.get('/:postid', async ( req, res ) => {
    try {
        const post = await Post.findById(req.params.postid);
        res.json(post);
    } catch(err){
        res.json({message: err});
    }
});

router.delete('/:postid', async ( req, res ) => {
    try {
        const deletedPost = await Post.deleteOne({ _id: req.params.postid });
        res.json(deletedPost);
    } catch(err){
        res.json({message: err});
    }
});

router.patch('/:postid', async( req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postid},{ title: req.body.title});
        res.json({updatedPost});
    } catch(err){
        res.json({message: err});
    }

});

module.exports = router;

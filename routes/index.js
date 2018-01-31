const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js');
const userRouter = require('./users.js');


module.exports=router;

router.use('/wiki',wikiRouter);
router.use('/users',userRouter)



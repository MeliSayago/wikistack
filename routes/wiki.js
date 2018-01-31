const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

    router.post('/', function(req, res, next) {
    User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {
      var user = values[0];
      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });
      return page.save().then(function (page) {
        return page.setAuthor(user);
      });
    })
    .then(function (page) {
      res.redirect(page.urlTitle);
    })
    .catch(next);
    });
    
    router.get('/add', function(req, res, next) {
      res.render('addpage')
    });

    router.get('/', function(req, res, next) {
      Page.findAll()
      .then(function(data){
      	res.render('index',{pages:data})
      })
      
    });

  	 router.get('/:urlTitle', function (req, res, next) {
	    Page.findOne({
		    where: {
		        urlTitle: req.params.urlTitle
		    },
		    include: [
		        {model: User, as: 'author'}
		    ]
		})
		.then(function (page) {
		    // la instancia page va a tener una propiedad .author 
		    // como un objeto user ({ name, email })
		    if (page === null) {
		        res.status(404).send();
		    } else {
		        res.render('wikipage', {
		            page: page
		        });
		    }
		})
		.catch(next);
    });



module.exports=router;
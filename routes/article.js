'use strict';
const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// --- GET list of articles, homepage
router.get('/', (req, res, next) => {
  Article.find()
    .then((results) => res.json(results))
    .catch(next);
});

// --- GET single article by :id
router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({error: 'not found'});
      }
      return res.json(article);
    })
    .catch(next);
});

// --- POST single article
router.post('/', (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const content = req.body.content;
  const category = req.body.category;
  const autor = req.body.autor;

  const newArticle = Article({
    title,
    image,
    content,
    category,
    autor
  });

  newArticle.save()
    .then(() => res.json(newArticle))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  // console.log(req.body.id);

  Article.findByIdAndRemove(id)
    .then(() => res.json({}))
    .catch(next);
});

module.exports = router;

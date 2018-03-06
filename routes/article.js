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
  Article.findById(req.params.id, (err, article) => {
    if (err) { return res.json(err).status(500); }
    if (!article) { return res.json(err).status(404); }

    return res.json(article);
  });
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

  newArticle.save();
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  // console.log(req.body.id);

  Article.findByIdAndRemove(id, (err, product) => {
    if (err) {
      console.log(req.body.id);
      return next(err);
    }
  });
});

module.exports = router;

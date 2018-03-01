const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', (req, res, next) => {
  Article.find()
    .then((results) => res.json(results))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) { return res.json(err).status(500); }
    if (!article) { return res.json(err).status(404); }

    return res.json(article);
  });
});

module.exports = router;

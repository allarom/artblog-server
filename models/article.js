'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  title: String,
  image: String,
  content: String,
  category: String,
  comments: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

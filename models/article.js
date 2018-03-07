'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  title: {
    type: String,
    required: true
  },
  image: String,
  content: String,
  category: String,
  comments: Array,
  autor: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

const mongoose = require('mongoose');
const schema = require('./tweets-schema');
const model = mongoose.model('TweetModel', schema);
module.exports = model;
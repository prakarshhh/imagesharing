// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: true } //Store image paths
});

module.exports = mongoose.model('User', UserSchema);

const express = require('express');
const users = require('../controller/users');
const auth = require('../controller/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}
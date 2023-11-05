const Router = require('express').Router();
const controller = require('../controller/responsible-controller');

Router.get('/:id', controller.getUser);

module.exports = Router;
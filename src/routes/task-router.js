const Router = require('express').Router();
const controller = require('../controller/task-controller');

Router.get('/list', controller.list);
Router.get('/data', controller.getAll);
Router.post('/add', controller.add);

module.exports = Router;
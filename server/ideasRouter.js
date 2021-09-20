const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase } = require('./db');

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  req.ideaId = ideaId;
  next();
});

ideasRouter.get('/', (req, res, next) => {
  // get array of all ideas
  const allIdeas = getAllFromDatabase('ideas');
  res.send(allIdeas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  // get single idea by id
});

ideasRouter.post('/', (req, res, next) => {
  // create new idea
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  // update single idea by id
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  // delete single idea by id
});


module.exports = ideasRouter;
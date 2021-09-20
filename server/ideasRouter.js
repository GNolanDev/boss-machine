const express = require('express');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  req.ideaId = ideaId;
  next();
});

ideasRouter.get('/', (req, res, next) => {
  // get array of all ideas
});

ideasRouter.get('/:ideasId', (req, res, next) => {
  // get single idea by id
});

ideasRouter.post('/', (req, res, next) => {
  // create new idea
});

ideasRouter.put('/:ideasId', (req, res, next) => {
  // update single idea by id
});

ideasRouter.delete('/:ideasId', (req, res, next) => {
  // delete single idea by id
});


module.exports = ideasRouter;
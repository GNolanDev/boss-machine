const express = require('express');
const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, minionId) => {
  req.minionId = minionId;
  next();
});

minionsRouter.get('/', (req, res, next) => {
  // get array of all minions
});

minionsRouter.get('/:minionsId', (req, res, next) => {
  // get single minion by id
});

minionsRouter.post('/', (req, res, next) => {
  // create new minion
});

minionsRouter.put('/:minionsId', (req, res, next) => {
  // update single minion by id
});

minionsRouter.delete('/:minionsId', (req, res, next) => {
  // delete single minion by id
});


module.exports = minionsRouter;
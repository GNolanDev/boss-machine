const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase } = require('./db');

minionsRouter.param('minionId', (req, res, next, minionId) => {
  req.minionId = minionId;
  next();
});

minionsRouter.get('/', (req, res, next) => {
  // get array of all minions
  const allMinions = getAllFromDatabase('minions');
  if (!allMinions) {
    res.sendStatus(404);
  }
  res.send(allMinions);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  // get single minion by id
  const minion = getFromDatabaseById('minions', req.minionId);
  if (!minion) {
    res.sendStatus(404);
  }
  res.send(minion);
});

minionsRouter.post('/', (req, res, next) => {
  // create new minion
  const newMinion = req.body;
  if (
    !('weaknesses' in newMinion && 'name' in newMinion && 'title' in newMinion && 'salary' in newMinion)
    ||
    !((typeof newMinion.weaknesses === 'string' || newMinion.weaknesses instanceof String)
      && (typeof newMinion.name === 'string' || newMinion.name instanceof String)
      && (typeof newMinion.title === 'string' || newMinion.title instanceof String)
      && (!isNaN(parseFloat(newMinion.salary)) && isFinite(newMinion.salary))
    )) {
      res.status(400).send('did not pass validation');
      return;
    }
  try {
    const response = addToDatabase('minions', newMinion);
    res.send(response);
  } catch {
    res.status(400).send('caught error when creating');
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  // update single minion by id
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  // delete single minion by id
});


module.exports = minionsRouter;
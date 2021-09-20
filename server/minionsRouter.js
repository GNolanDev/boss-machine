const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

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
    res.status(201).send(response);
  } catch {
    res.status(400).send('caught error when creating');
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  // update single minion by id
  if ((isNaN(parseFloat(req.minionId)) || !isFinite(req.minionId))) {
    res.sendStatus(404);
    return;
  }
  const replaceMinion = req.body;
  req.body.id = req.minionId;
  if (
    !('id' in replaceMinion && 'weaknesses' in replaceMinion && 'name' in replaceMinion && 'title' in replaceMinion && 'salary' in replaceMinion)
    ||
    !((typeof replaceMinion.weaknesses === 'string' || replaceMinion.weaknesses instanceof String)
      && (typeof replaceMinion.name === 'string' || replaceMinion.name instanceof String)
      && (typeof replaceMinion.title === 'string' || replaceMinion.title instanceof String)
      && (typeof replaceMinion.id === 'string' || replaceMinion.id instanceof String)
      && (!isNaN(parseFloat(replaceMinion.salary)) && isFinite(replaceMinion.salary))
    )) {
      res.status(404).send('did not pass validation');
      return;
    }
  try {
    const response = updateInstanceInDatabase('minions', replaceMinion);
    res.send(response);
  } catch {
    res.status(404).send('caught error when updating');
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  // delete single minion by id
  if ((isNaN(parseFloat(req.minionId)) || !isFinite(req.minionId))) {
    res.sendStatus(404);
    return;
  }
  const deleteResult = deleteFromDatabasebyId('minions', req.minionId);
  if (deleteResult) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});


module.exports = minionsRouter;
const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase } = require('./db');

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
  const idea = getFromDatabaseById('ideas', req.ideaId);
  if (!idea) {
    res.sendStatus(404);
  }
  res.send(idea);
});

ideasRouter.post('/', (req, res, next) => {
  // create new idea
  const newIdea = req.body;
  if (
    !('name' in newIdea && 'description' in newIdea && 'numWeeks' in newIdea && 'weeklyRevenue' in newIdea)
    ||
    !((typeof newIdea.name === 'string' || newIdea.name instanceof String)
      && (typeof newIdea.description === 'string' || newIdea.description instanceof String)
      && (!isNaN(parseFloat(newIdea.numWeeks)) && isFinite(newIdea.numWeeks))
      && (!isNaN(parseFloat(newIdea.weeklyRevenue)) && isFinite(newIdea.weeklyRevenue))
    )) {
      res.status(400).send('did not pass validation');
      return;
    }
  try {
    const response = addToDatabase('ideas', newIdea);
    res.send(response);
  } catch {
    res.status(400).send('caught error when creating');
  }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  // update single idea by id
  const replaceIdea = req.body;
  req.body.id = req.ideaId;
  if (
    !('id' in replaceIdea && 'name' in replaceIdea && 'description' in replaceIdea && 'numWeeks' in replaceIdea && 'weeklyRevenue' in replaceIdea)
    ||
    !((typeof replaceIdea.name === 'string' || replaceIdea.name instanceof String)
      && (typeof replaceIdea.description === 'string' || replaceIdea.description instanceof String)
      && (typeof replaceIdea.id === 'string' || replaceIdea.id instanceof String)
      && (!isNaN(parseFloat(replaceIdea.numWeeks)) && isFinite(replaceIdea.numWeeks))
      && (!isNaN(parseFloat(replaceIdea.weeklyRevenue)) && isFinite(replaceIdea.weeklyRevenue))
    )) {
      res.status(400).send('did not pass validation');
      return;
    }
  try {
    const response = updateInstanceInDatabase('ideas', replaceIdea);
    res.send(response);
  } catch {
    res.status(400).send('caught error when updating');
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  // delete single idea by id
  const deleteResult = deleteFromDatabasebyId('ideas', req.ideaId);
  if (deleteResult) {
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});


module.exports = ideasRouter;
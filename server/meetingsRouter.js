const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  // get all meetings
  const allMeetings = getAllFromDatabase('meetings');
  res.send(allMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
  // create new meeting
});

meetingsRouter.delete('/', (req, res, next) => {
  // delete all meetings
});


module.exports = meetingsRouter;
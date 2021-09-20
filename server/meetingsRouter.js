const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, deleteAllFromDatabase, createMeeting, addToDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  // get all meetings
  const allMeetings = getAllFromDatabase('meetings');
  res.send(allMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
  // create new meeting
  try {
    const newMeeting = createMeeting();
    const response = addToDatabase('meetings', newMeeting);
    res.status(201).send(response);
  } catch {
    res.status(400).send('caught error when creating');
  }
});

meetingsRouter.delete('/', (req, res, next) => {
  // delete all meetings
  const deleteResult = deleteAllFromDatabase('meetings');
  if (deleteResult) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});


module.exports = meetingsRouter;
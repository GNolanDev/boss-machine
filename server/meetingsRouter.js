const express = require('express');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
  // get all meetings
});

meetingsRouter.post('/', (req, res, next) => {
  // create new meeting
});

meetingsRouter.delete('/', (req, res, next) => {
  // delete all meetings
});


module.exports = meetingsRouter;
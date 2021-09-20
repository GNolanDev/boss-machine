const checkMillionDollarIdea = (req, res, next) => {
  // console.log(req.ideaId);
  // check for valid input first
  if (req.ideaId && (isNaN(parseFloat(req.ideaId)) || !isFinite(req.ideaId))) {
    res.sendStatus(404);
    return;
  }

  if (
    !(req.body.numWeeks && req.body.weeklyRevenue) ||
    isNaN(parseFloat(req.body.numWeeks)) ||
    !isFinite(req.body.numWeeks) ||
    isNaN(parseFloat(req.body.weeklyRevenue)) ||
    !isFinite(req.body.weeklyRevenue)
  ) {
    res.status(400).send("invalid idea properties");
    return;
  }
  // now check for revenue < 1m
  if (Number(req.body.numWeeks) * Number(req.body.weeklyRevenue) < 1000000) {
    res.status(400).send("does not exceed 1m total revenue");
    return;
  }
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

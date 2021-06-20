const axios = require('axios');

module.exports.getAllQuestions = (options, res) => {
  axios(options)
    .then((response) => {
      res.send(response.data.results)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.getAllAnswers = (options, res) => {
  axios(options)
    .then((response) => {
      res.send(response.data.results)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.markHelpfulQuestion = (options, res) => {
  axios(options)
    .then((response) => {
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.reportQuestion = (options, res) => {
  axios(options)
    .then((response) => {
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.markHelpfulAnswer = (options, res) => {
  axios(options)
    .then((response) => {
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.sendStatus(err);
    })
}

module.exports.reportAnswer = (options, res) => {
  axios(options)
    .then((response) => {
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.addQuestion = (options, res) => {
  axios(options)
    .then((response) => {
      console.log(response.status);
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports.addAnswer = (options, res) => {
  axios(options)
    .then((response) => {
      console.log(response.status);
      res.sendStatus(response.status)
    })
    .catch((err) => {
      res.send(err);
    })
}


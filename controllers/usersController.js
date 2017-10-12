const db = require("../models")

module.exports = {
    findAll: function(req, res){
        db.User
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.User
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    findScoresByGameId: function(req, res) {
        db.User
          .find({gameid: req.params.id})
          .then(data => res.json(data))
          .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(data => res.json(data))
          .catch(err => res.status(422).json(err));
      },    
}
const router = require("express").Router()
const GameController = require("../../controllers/GameController")

router.route("/")
.get(GameController.findAll)
.post(GameController.create)


module.exports = router;
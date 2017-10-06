const router = require("express").Router()
const usersRoutes = require("./users")
const gameRoutes = require("./game")

router.use("/users", usersRoutes)
router.use("/game", gameRoutes)

module.exports = router
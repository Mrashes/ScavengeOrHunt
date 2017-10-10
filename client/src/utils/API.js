import axios from "axios"

export default {
    saveGame: (gamedata) => {
        return axios.post("/api/game", gamedata)
    },

    getGame: (gameid) => {
        return axios.get("/api/game/"+gameid)
    }
}
import React from "react";
import Wrapper from "../../components/Wrapper";
import { FormBtn } from "../../components/Form";
import "./EndGame.css"
//props.location.state.data
//score is in hours min sec, combine to show score

const EndGame = props => {
    const formatDate = date => {
        const month = date.toString().slice(5,7);
        const day = date.toString().slice(8,10);
        const year = date.toString().slice(2,4);
        return `${month}/${day}/${year}`
    }

    return ( 
        <Wrapper>
            <h1>Game Over!</h1>
            <h2>LeaderBoard</h2>
            <table className="table leaderboard">
                <thead>
                    <tr>
                        <th className="number" scope="row">#</th>
                        <th className="name">Username</th>
                        <th className="time">Time</th>
                        <th className="date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.location.state.data.map((user, index) => (
                        <tr key={index}>
                            <th className="number" scope="row">{index+1}</th>
                            <td className="name">{user.name}</td>
                            <td className="time">{user.hours}:{user.minutes}:{user.seconds}</td>
                            <td className="date">{formatDate(user.scoredate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <FormBtn 
                className="btn btn-success"
                role="button"
                to="/"
            >
                Home
            </FormBtn>
        </Wrapper> )
}

export default EndGame;
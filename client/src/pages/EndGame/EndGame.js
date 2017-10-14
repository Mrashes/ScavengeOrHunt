import React from "react";
import Wrapper from "../../components/Wrapper";
//props.location.state.data
//score is in hours min sec, combine to show score

const EndGame = props =>
    <Wrapper>
        <h1>Game Over!</h1>
        <h2>LeaderBoard</h2>
        <table class="table">
            <thead>
                <tr>
                <th>#</th>
                <th>Username</th>
                <th>Time</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {props.location.state.data.map((user, index) => (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>user.name</td>
                        <td>{user.hours}:{user.mintes}:{user.seconds}</td>
                        <td>{user.date.toString()}</td>
                    </tr>
                ))}
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </Wrapper>

export default EndGame;
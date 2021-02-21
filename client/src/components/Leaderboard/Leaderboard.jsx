import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Leaderboard extends Component {
  onClick = (e) => {
      e.preventDefault() // prevent form from submitting to actual file
      console.log("Go to next round")
      }

  render() {
    return (
      <div style={containerStyle}>
        <h1>Leaderboard</h1>
            {
              this.props.players.map((player, index) => {
                  return <p>{index + 1}. {player.name}: {player.points}</p>
              })
            }
            <Link onClick={e => null} to={`/game`}> 
              <Button color="primary">Next</Button>
            </Link>
            <Link onClick={e => null} to={`/`}> 
              <Button color="primary">End Game</Button>
            </Link>
      </div>
    );
  }
}

const containerStyle = {
  textAlign: "center"
}

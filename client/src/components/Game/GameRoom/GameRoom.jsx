import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class GameRoom extends Component {

  render() {
    return (
      <div style={gameRoomStyle}>
          <h1>Welcome to the game! </h1>

          <Button variant="contained" style={buttonStyle} color="primary" onClick={this.props.startGame}>Start New Game</Button>
      </div>
    )
  }
}

const gameRoomStyle = {
    textAlign: "center",
    background: "#FEF9E7",
    marginTop: "100px",
    marginRight: "300px",
    marginLeft: "300px",
    paddingBottom: "50px",
    paddingTop: "50px",
    borderRadius: "30px"
}

const buttonStyle = {
    textAlign: "center",
    fontFamily: "Georgia",
    background: "#FFDD53",
    borderRadius: "20px",
    width: "200px"
  }
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, TextField, Box } from "@material-ui/core";

export default class Join extends Component {
  state = {
    name: ""
  }

  // This part works; it just needs some styling now
  // It will reroute to player to /game?name=[entered name]

  render() {
    return (
      <div style={joinPageStyle}>
        <div style={welcomeStyle}>Log In To Play</div>
      <div>
        <div>
          <Box flexDirection="col">
            <TextField style={boxStyle} name="name" placeholder="Username: " value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          </Box>
        </div>

        <div>
          <Box flexDirection="col">
            <Link onClick={e => (!this.state.name) ? e.preventDefault() : null} to={`/game?name=${this.state.name}`}> 
              <Button variant="contained" style={darkBox} color="primary">Login</Button>
            </Link>
          </Box>
        </div>
        </div>
      </div>
    );
  }
}

const joinPageStyle = {
  textAlign: "center",
  background: "#FEF9E7",
  marginTop: "100px",
  marginRight: "300px",
  marginLeft: "300px",
  paddingBottom: "50px",
  paddingTop: "50px",
  borderRadius: "30px"
}

const welcomeStyle = {
  textAlign: "center",
  fontFamily: "Georgia",
  fontSize: "30px"
}

const boxStyle = {
  textAlign: "center",
  fontFamily: "Georgia",
  background: "#FEF9E7",
  borderRadius: "20px",
  width: "200px",
  paddingBottom: "5px",
  paddingTop: "5px",
  paddingRight: "7px",
  paddingLeft: "7px",
  marginBottom: "5px"
}

const darkBox = {
  textAlign: "center",
  fontFamily: "Georgia",
  background: "#FFDD53",
  borderRadius: "20px",
  width: "200px"
}
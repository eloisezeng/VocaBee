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
        {/* Rectangle 4 on figma */}
        <div style={rectangle2}> </div>
        <div style={rectangle1}> </div>
        <div style={rectangle2}> </div>
      <div>
        <div>
          <Box flexDirection="col">
            <TextField name="name" placeholder="Username: " value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
          </Box>
        </div>

        <div>
          <Box flexDirection="col">
            <Link onClick={e => (!this.state.name) ? e.preventDefault() : null} to={`/game?name=${this.state.name}`}> 
              <Button color="primary">Join</Button>
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
}

const rectangle1 = {
  width: 207,
  height: 42,
  background: '#FEF9E7',
}

const rectangle2 = {
  width: 117,
  height: 26,
  background: '#FFDD53',
}
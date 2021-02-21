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
      <div>
        <img src="/client/src/assets/image0.jpg" position="absolute" />
        <div style = {rectangle1} />
        <div style = {rectangleCode}> Enter Game Code </div>

      <div>
        <h3>Join Page</h3>
      <div>
          <Box flexDirection="col">
            <TextField name="name" placeholder="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
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

const rectangle1 = {
  position: 'absolute',
  width: 249, 
  height: 39, 
  left: 452, 
  top: 467, 
  background: '#FEF9E7',
}
const rectangleCode = {
  position: 'absolute',
  width: 249, 
  height: 39, 
  left: 452, 
  top: 467, 
  background: '#FEF9E7',
  fontFamily: "Roboto",
  fontStyle: "Regular",
  fontSize: "18px",
  lineHeight: "21px",
  lineHeight: "100%",
  Align: "Center",
  verticalAlign: "Center",
  color: ""
  
}

const rectangleName = {
  position: 'absolute',
  width: 207,
  height: 42,
  left: 473,
  top: 411,
  background: 'FFC500'
}

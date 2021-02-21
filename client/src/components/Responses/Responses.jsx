import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default class Responses extends Component {
    state = {
        guess: "",
        see_leaderboard: false,
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value})
    onSubmit = (e) => {
        e.preventDefault() // prevent form from submitting to actual file
        // call props method so you can pass up the method App
        this.props.submitGuess(
            this.state.guess)
        this.setState({ guess: ""})
    }
  render() {
    return (
        <div>
            <h1>Submit which one is the real definition!</h1>
            <form onSubmit={this.onSubmit}>
                {this.props.responses.map((response) =>
                    (
                    <div>
                        <input type="radio" id={response.def} name={response.def} value={response.def}/>
                        <label for={response.def}>{response.def}</label><br></br>
                    </div>
                    )
                )}
                 <input
                    type='submit'
                    value='guess'
                    className='btn'
                    />
            </form>

            <Link onClick={e => (!this.state.see_leaderboard) ? e.preventDefault() : null} to={`/leaderboard`}> 
              {/* <Button color="primary">See Leaderboard</Button> */}
            </Link>
            
        </div>
    )
  }
}
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default class Responses extends Component {
    state = {
        guess: "",
    }
    onChange = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value})
        // redirect
    }
    // onSubmit = (e) => {
    //     e.preventDefault() // prevent form from submitting to actual file
    //     // call props method so you can pass up the method App
    //     console.log("Hi", e.target.value)
    //     this.props.submitGuess(
    //         this.state.guess)
    //     this.setState({ guess: ""})
    // }
  render() {
    return (
        <div>
            <h1>Submit which one is the real definition!</h1>
            {this.props.responses.map((response) =>
                (
                <Link onClick={console.log(this.props.history)}>
                    <input type="radio" id={response.def} name={response.def} value={response.def} onChange={this.onChange}/>
                    <label for={response.def}>{response.def}</label><br></br>
                </Link>
                )
            )}
            {/* <Link onClick={e => (!this.state.guess) ? e.preventDefault() : null} to={`/leaderboard`}> 
                <Button color="primary">Submit</Button>
            </Link>     */}
        </div>
    )
  }
}
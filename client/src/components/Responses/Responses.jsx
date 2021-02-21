import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Divider, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
}));

export default class Responses extends Component {
    state = {
        guessUserID: "",
    }


    handleRadioChange = (e) => {
        this.setState({
            guess: e.target.value
        });
    }

  render() {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend"><h1>Guess which one is the real definition!</h1></FormLabel>
                <RadioGroup aria-label="guessQuiz" name="guessQuiz" value={this.state.guessUserID} onChange={this.handleRadioChange}>
                    {
                        this.props.responses.map((response) => {
                            console.log(response.definition);
                            return <FormControlLabel value={response.userID} control={<Radio />} label={response.definition} />
                        })
                    }
                </RadioGroup>

                <Button onClick={() => this.props.onSubmit(this.state.guessUserID)} type="submit" variant="outlined" color="primary">Submit Picked Guess</Button>
            </FormControl>
        </div>
    )
  }
}
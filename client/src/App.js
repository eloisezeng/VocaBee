import React, {Component} from 'react';
import Game from './components/Game/Game';
import Join from './components/Join/Join';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Responses from './components/Responses/Responses';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
//       "Defenestration": "the action of throwing someone out of a window.",
//       "Fustigated": "to beat someone with a stick",
//       "Collywobbles": "stomach pain",
//       "Bumbershoot": "an umbrella",
//       "Donnybrook": "a scene of uproar and disorder"


  // Get this info from within the component. I will comment it all out soon.
  state = {
    word: "bumbershoot", // GET from backend
    definition:  "an umbrella",
    players: // player names, definitions, points. GET from backend. 
    [
      {
        name: "Bob",
        def: "the urge to ram a tractor into a porch",
        pts: 9
      },
      {
        name: "Ian",
        def: "the action of ...",
        pts: 2
      },
      {
        name: "real-definition",
        def: "the action of throwing someone out of a window",
        pts: 0
      },
    ]
  }
  // submitDef = (def) => {
  //   // append newTodo to todos
  //   console.log(def)
  //   this.setState({ player: [...this.state.player_defs, def]})
  //   console.log(this.state.player_defs)
  // }

  
  render() {
    return (
      <Router>
         <React.Fragment>
              <Header/>
          </React.Fragment>
        <Route path="/" exact component={Join} />
        <Route path="/game" render={props => (
          <React.Fragment>
            {/* <Game 
            word={Object.keys(this.state.words)[this.state.words.length * Math.random() << 0]}
            submitDef={this.submitDef}
            /> */}
              {/* <Game 
            word={this.state.word}
            submitDef={this.submitDef}
            /> */}
            <Game />
          </React.Fragment>
        )} />
        <Route path="/responses" render={props => (
          <React.Fragment>
            <Responses 
            responses={this.state.players}
            />
          </React.Fragment>
        )} />
      </Router>
      

    );
  }
}

export default App;

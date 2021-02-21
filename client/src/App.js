import React, {Component} from 'react';
import Game from './components/Game/Game';
import Join from './components/Join/Join';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Responses from './components/Responses/Responses';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
         <React.Fragment>
              <Header/>
          </React.Fragment>
        <Route path="/" exact component={Join} />
        <Route path="/game" render={props => (
            <Game />
        )} />
        <Route path="/responses" render={props => (
            <Responses/>
        )} />
         <Route path="/leaderboard" render={props => (
            <Leaderboard />
        )} />
        </div>
      </Router>
      

    );
  }
}

export default App;

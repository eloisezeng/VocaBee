import React, { Component } from 'react'
import './WordCard.css';

export default class WordCard extends Component {

  render() {
    return (
        <div style={cardStyle}>
            {this.props.word}
        </div>
    )
  }
}

const cardStyle = {
  backgroundColor: "gold",
  margin: "50px"
}
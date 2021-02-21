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
  textAlign: "center",
  background: '#F6D458',
  padding: "20px", 
  margin: "20px",
  fontSize: "100px",
  borderRadius: "10px"
}
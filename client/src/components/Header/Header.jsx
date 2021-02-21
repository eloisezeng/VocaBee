// function based component bc it's all markup
// type rfc tab

import React from 'react'

export default function Header() {
    return (
        <header style={headerstyle}>
           <img src="/src/assets/image0.jpg" position="absolute" />
        </header>
    )
}

const headerstyle = {
    // background: 'rgb(30, 200, 101)',
    color: 'black', // color of text
    textAlign: 'center',
    padding: '10px',
    marginBottom: '20px',
}
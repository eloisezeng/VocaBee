// function based component bc it's all markup
// type rfc tab

import React from 'react'

export default function Header() {
    return (
        <header style={headerstyle}>
           <img src="/images/vocabee.jpg" style={{height: "100px"}}/>
        </header>
    )
}

const headerstyle = {
    // background: 'rgb(30, 200, 101)',
    textAlign: 'center',
}
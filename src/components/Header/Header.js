import React from 'react'
import './Header.css'

const Header = () => {
    return <div className="header">
            <h1 onClick={() => window.scroll(0,0)}>MovieScape</h1>
        </div>
    
}

export default Header

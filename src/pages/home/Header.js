import React, { Component } from 'react';
import './Header.scss';
import ReactPlayer from 'react-player'

class Header extends Component {
    calcWidth(){
        let width = `"${window.innerWidth}px"`
        console.log(width)
        return "1000px"
    }

    render() {
        return <div>
            {/* bold communication and meeting */}
            {/* spacing in navbar */}
            {/* add support to navbar */}
            <div className='header-top-container'>
                <div className='header-left-container'>
                    <div className="header-title">Scambi Festival</div>
                    <div className="header-subtitle">The Festival of Paneuretic Workshops, free for all to attend</div>
                </div>
                <div className='header-right-container'>
                    August 25 - 28, 2022 <br/>
                    La Pigna, Sanremo, Italy
                </div>
            </div>
            <div className="header-video">
                <ReactPlayer width='100%' height='100%' url='https://vimeo.com/658183199' />
            </div>
        </div>
    }
}

export default Header;
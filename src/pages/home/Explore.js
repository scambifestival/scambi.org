import React, { Component } from 'react';
import './Explore.scss';

class Explore extends Component {
    render() {
        return <div className='explore-main-container'>
            <div className='explore-title'>Explore Scambi Festival</div>
            <div>
                <iframe className="explore-map" src="https://www.openstreetmap.org/export/embed.html?bbox=7.615242004394532%2C43.75621697418052%2C7.848701477050782%2C43.8835420221887&amp;layer=mapnik" >
                </iframe>
            </div>
        </div>
    }
}

export default Explore;
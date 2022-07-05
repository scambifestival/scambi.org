import React, { Component } from 'react';
import './Explore.scss';

class Explore extends Component {
    render() {
        return <div className='explore-main-container'>
            <div className='explore-title'>Explore Scambi Festival</div>
            <div>
                <iframe className="explore-map" src="https://www.openstreetmap.org/export/embed.html?bbox=7.764823436737061%2C43.82261500966294%2C7.778985500335694%2C43.82944193035853&amp;layer=mapnik" >
                </iframe>
            </div>
        </div>
    }
}

export default Explore;
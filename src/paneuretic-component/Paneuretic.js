import React, { Component } from 'react';
import './Paneuretic.css';
import laboratori from '../images/laboratori.png';

class Paneuretic extends Component {
  render() {
    return (
      <div className='main-container'>
        <div className='first-container'>
          <div className='inner-container'>
            <div className='header'>What are paneuretic workshops?</div>
            <div className='content'>
              Pan - eur - etic: Neologism deriving from the Greek pan (all),
              eurisko (discover) and ethos (living), because we wish to combine
              diverse realities that would never meet in their original
              contexts, while celebrating and respecting our differences,
              discovering and developing inspiring ideas.
            </div>
            <div className='right-container'>
              <img src={laboratori}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paneuretic;

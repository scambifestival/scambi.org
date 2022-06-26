import React, { Component } from 'react';
import './NLSubscribe.scss';
import SubscribeImage from '../images/SubscribeImage.png';


/**
 * 
 * 
 */
class NLSubscribe extends Component {
    render() {
        return <div>
            <div className='nls-main-container'>
                <div className='nls-left-container'>
                    <img className="nls-left-image" src={SubscribeImage} />
                </div>
                <div className='nls-right-container'> 
                    <div className='nls-inner-container'>
                            <div className='nls-upper-subtitle'>exchanges of letters, our newsletter</div>
                            <div className='nls-title'>Scambi Epistolari</div>
                            <div className='nls-lower-subtitle'>Join the conversation - sign up now to receive updates on Scambi activities.</div>
                            <div className='nls-email-fields'>
                                <input className='nls-text-field' type="text" placeholder="Email" />
                                <button className='nls-submit-button'>Submit</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    }
}

export default NLSubscribe;
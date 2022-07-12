import React, { Component } from 'react';
import './NLSubscribe.css';
// import SubscribeImage from "../../assets/subscribe/SubscribeImage.png";
import EmailValidation from './../../components/emailValidation/EmailValidation';

class NLSubscribe extends Component {
	render() {
		return (
			<div className='main-container'>
				<div className='left-container'>{'<img src={SubscribeImage} /> '}</div>
				<div className='right-container'>
					<div className='inner-container'>
						<div className='upper-subtitle'>
							exchanges of letters, our newsletter
						</div>
						<div className='title'>Scambi Epistolari</div>
						<div className='lower-subtitle'>
							Join the conversation - sign up now to receive updates on Scambi
							activities.
						</div>
						<div className='email-fields'>
							<EmailValidation className='submit-button' />
							<button className='submit-button'>Submit</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NLSubscribe;

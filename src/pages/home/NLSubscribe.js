import React, { Component } from 'react';
import './NLSubscribe.css';
import SubscribeImage from '../../assets/subscribe/SubscribeImage.png';
import EmailValidation from './../../components/emailValidation/EmailValidation';

class NLSubscribe extends Component {
	render() {
		return (
			<div className='w-11/12 flex flex-row items-center bg-transparent mx-auto drop-shadow-2xl sm:w-max sm:mx-10'>
				<div className='left-container hidden xl:block w-full h-full'>
					<img src={SubscribeImage} alt='' className=''/>
				</div>
				<div className='w-full h-full flex justify-center items-center bg-purple-650 rounded-3xl py-16 xl:py-0 xl:rounded-none xl:rounded-r-3xl'>
					<div className='inner-container w-10/12 space-y-3 text-left'>
						<div className='upper-subtitle'>
							exchanges of letters, our newsletter
						</div>
						<div className='title'>Scambi Epistolari</div>
						<div className='lower-subtitle'>
							Join the conversation - sign up now to receive updates on Scambi
							activities.
						</div>
						<div className='email-fields'>
							<EmailValidation fileName='NLSubscribe'>
								Subscribe
							</EmailValidation>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NLSubscribe;

import React, { Component } from 'react';
import './About.css';
import AboutExampleWorkshop from './AboutExampleWorkshop';
import AboutHeader from './Header/AboutHeader';
import AboutWorkshopExplanation from './WorkShopExplanation/AboutWorkshopExplanation';
import AboutQuote from './AboutQuote';
import AboutOurTeam from './OurTeam/AboutOurTeam';
import NLSubscribe from './../home/NLSubscribe';

class About extends Component {
	render() {
		return (
			<div>
				<AboutHeader />
				<AboutWorkshopExplanation />
				<AboutExampleWorkshop />
				<AboutQuote />
				<AboutOurTeam />
				<NLSubscribe />
			</div>
		);
	}
}

export default About;

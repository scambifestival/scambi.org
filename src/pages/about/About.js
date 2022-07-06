import React, { Component } from "react";
import "./About.css";
import AboutExampleWorkshop from "./AboutExampleWorkshop";
import AboutHeader from "./AboutHeader";
import AboutWorkshopExplanation from "./AboutWorkshopExplanation";
import AboutQuote from "./AboutQuote";
import AboutOurTeam from "./AboutOurTeam";

class About extends Component {
	render() {
		return (
			<div>
				<AboutHeader />
				<AboutWorkshopExplanation />
				<AboutExampleWorkshop />
				<AboutQuote />
				<AboutOurTeam />
			</div>
		);
	}
}

export default About;

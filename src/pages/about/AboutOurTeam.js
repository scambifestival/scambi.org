import React, { Component } from "react";
import "./About.css";

class AboutOurTeam extends Component {
	render() {
		return (
			<div className="aboutScambiOurTeam-container">
				<div className="aboutOurTeamText">
					<h2 className="textOurTeam">Our Team</h2>
					<p className="aboutOurTeam-smallText">
						We are a group of under 25s coming from every corner of Europe. Our
						association was born from our wish to value real and deep ties,
						horizointally and dialogue, curiosity and welcoming of the
						different.
					</p>
					<p className="aboutOurTeam-smallText">
						We will be waiting for you in Sanremo, to introduce ourselves
						properly.
					</p>
				</div>
				<div className="aboutOurTeamImage">
					<img src="#" />
				</div>
			</div>
		);
	}
}

export default AboutOurTeam;

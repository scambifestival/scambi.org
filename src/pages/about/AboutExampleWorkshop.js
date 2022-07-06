import React, { Component } from "react";
import "./About.css";

class AboutExampleWorkshop extends Component {
	render() {
		return (
			<div className="aboutExampleWorkshop-container">
				<div className="aboutExampleWorkshop-text">
					<h2>Workshops we held in Scambi 2021, "Meeting"</h2>
				</div>
				<div className="exmapleImages">
					<div className="example1">
						{" "}
						<img src="#" />
						<p>Street Art</p>
					</div>
					<div className="example2">
						{" "}
						<img src="#" />
						<p>Rifugiato per un giorno</p>
					</div>
					<div className="example3">
						{" "}
						<img src="#" />
						<p>Scambi Sounds Lab</p>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutExampleWorkshop;

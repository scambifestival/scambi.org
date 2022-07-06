import React from "react";
import "./About.css";

const AboutHeaderText = (props) => {
	return (
		<div className="flex-text">
			<h1 className="scambi-text">About Scambi</h1>
			<p>
				Scambi, mearninig "exchange" in Italian, is the festival of interactive
				workshop organized in Pigna, the old town of Sanremo (italy) by a team
				of forty young people under-25,from all around Europe.
			</p>
			<p>
				Join us for our second year in Sanremo Italy on Aug 25 - 28, 2022, where
				we will explore <span className="disequilibirum">Disequilibirum.</span>
			</p>
			<button className="attendButton">Attend</button>
		</div>
	);
};

export default AboutHeaderText;

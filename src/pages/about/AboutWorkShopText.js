import React from "react";

const TextFlex = (props) => {
	return (
		<div className="flex-text">
			<h6 className="scambiExplanation-text">
				Our purpose is to recover the value of{" "}
				<span className="purpleText">communication</span> and{" "}
				<span className="purpleText">meeting</span> through paneuretic workshops
			</h6>
			<p className="scambi-workExplanation-text">
				Create your personalized journey of workshops from topics moving from
				physics to languages, from history to dancing, from music to law, from
				cooking to activism.
			</p>
			<p className="scambi-workExplanation-text">
				All workshops will be instrinsically careful to issues like
				<span className="bold-fonts">
					accessibility, sustainebility, and inclusion.
				</span>
			</p>
			<button className="exploreWorkshopButton">Explore workshops</button>
		</div>
	);
};

export default TextFlex;

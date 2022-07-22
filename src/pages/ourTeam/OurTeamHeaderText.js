import React from "react";
import "./OurTeam.css";
import Button from "../../components/button";

const OurTeamHeaderText = (props) => {
    return(
        <div className="our-team-header-text flex flex-col items-start text-left">
			<h1 className="scambi-text">Our Team</h1>
            <p>
                We are a group of under 25s coming from every corner of Europe.
            </p>
            <br/>
            <p>
                Our association was born from our wish to value real and deep ties, horizontality and dialogue, curiosity and welcoming of the different.
                After lots of videocalls, thousand doubts and just as many ideas, our team has become a family.
                We are proud of our diversity and passion, enthusiastic in sharing inspiration and in continuously proposing new perspectives.
            </p>
            <br/>
			<p>
                We will be waiting for you in Sanremo, to introduce ourselves properly.
                In the meanwhile, here is an anticipation of who we are.
			</p>
			<Button styleType='light' classes='mt-10' href="joinTeam">Join Our Team </Button>
		</div>
    );
}

export default OurTeamHeaderText;
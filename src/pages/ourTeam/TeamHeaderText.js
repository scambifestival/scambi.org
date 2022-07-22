import React from "react";
import "./OurTeam.css";
import TeamInfo from "./teamInfo.json"; 
import Button from "../../components/button";

const TeamHeaderText = (props) => {
    return(
        <div className="our-team-header-text flex flex-col items-start text-left">
            <h1 className="scambi-text">{TeamInfo.teamName}</h1>
            <p className="text-left">{TeamInfo.teamDescription}</p>
            <Button styleType='light' classes='mt-10' href="joinTeam">Join Our Team </Button>
        </div>
    );
}

export default TeamHeaderText;
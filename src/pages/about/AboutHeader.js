import React, { Component } from "react";
import AboutHeaderText from "./AboutHeaderText";
import Flex from "../../components/Flex/Flex";
import "../../components/Flex/Flex.css";

class AboutHeader extends Component {
	render() {
		return (
			<Flex>
				<AboutHeaderText />
				<img src="#" />
			</Flex>
		);
	}
}

export default AboutHeader;

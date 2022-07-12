import React from "react";
import "./Flex.css";

const Flex = (props) => {
	return (
		<div className="w-full h-fit flex flex-col flex-container  flex-container  md:flex-row md:space-x-4 md:space-y-0">
			{props.children}
		</div>
	);
};

export default Flex;

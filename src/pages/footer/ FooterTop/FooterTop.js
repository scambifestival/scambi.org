import React from "react";
import "./../Footer.css";

const FooterTop = () => {
	return (
		<div className="footerTop flex">
			<div className="topLeft w-1/5">
				<h2 className="headText">Scambi</h2>
			</div>
			<div className="topRight flex p-14">
				<div className="topRigh1t w-2/3 p-3">
					<h6 className="readyToJoin">Ready to join us?</h6>
				</div>
				<div className="topRight2 w-1/5">
					<button className="w-36 h-12 purpledBtn">ATTEND</button>
				</div>
			</div>
		</div>
	);
};

export default FooterTop;

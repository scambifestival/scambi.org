import React, { Component } from 'react';
import './About.css';
import pic2 from './../../assets/lab/gallery/rec1.png';
import pic3 from './../../assets/lab/gallery/rec10.png';

class AboutExampleWorkshop extends Component {
	render() {
		return (
			<div className="aboutExampleWorkshop-container">
				<div className="aboutExampleWorkshop-text flex">
					<h2 className="pt-10 text-xl">
						Workshops we held in Scambi 2021, "Meeting"
					</h2>
					<i
						className="fa fa-angle-right fa-3x pt-8 rightArrow"
						aria-hidden="true"></i>
				</div>
				<div className="exmapleImages">
					<div className="example1">
						<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
							<clipPath id="clip01">
								<path
									d="M48.6,-39.4C64.7,-32.4,80.7,-16.2,79.4,-1.3C78.1,13.7,59.6,27.3,43.4,38.5C27.3,49.6,13.7,58.2,1.1,57.1C-11.4,55.9,-22.8,45.1,-36.7,33.9C-50.7,22.8,-67.2,11.4,-72.9,-5.7C-78.6,-22.9,-73.6,-45.7,-59.7,-52.6C-45.7,-59.6,-22.9,-50.5,-3.3,-47.2C16.2,-43.9,32.4,-46.3,48.6,-39.4Z"
									transform="translate(100 100)"
								/>
							</clipPath>
						</svg>
						<svg
							width="27rem"
							height="27rem"
							viewBox="-10 0 250 250"
							style={{ objectFit: "cover" }}>
							<image
								xlinkHref={pic2}
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMid slice"
								clipPath="url(#clip01)"
							/>
						</svg>
						<p>Street Art</p>
					</div>
					<div className="example2">
						<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
							<clipPath id="clip02">
								<path
									d="M56,-51.5C70,-42,77.1,-21,77.7,0.6C78.3,22.2,72.5,44.4,58.4,57C44.4,69.6,22.2,72.7,3.7,69C-14.8,65.3,-29.7,54.9,-45.6,42.3C-61.4,29.7,-78.4,14.8,-80,-1.6C-81.6,-18,-67.8,-36,-51.9,-45.5C-36,-55,-18,-56.1,1.5,-57.6C21,-59.1,42,-61,56,-51.5Z"
									transform="translate(100 100)"
								/>
							</clipPath>
						</svg>
						<svg width="27rem" height="27rem" viewBox="0 0 250 250">
							<image
								xlinkHref={pic2}
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMid slice"
								clipPath="url(#clip02)"
							/>
						</svg>
						<p>Rifugiato per un giorno</p>
					</div>
					<div className="example3">
						<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
							<clipPath id="clip03">
								<path
									d="M59.2,-54.4C75.6,-42.8,86.9,-21.4,82.3,-4.6C77.8,12.3,57.4,24.6,41,36.8C24.6,48.9,12.3,60.9,-2.8,63.7C-17.9,66.5,-35.8,60.1,-51.8,48C-67.7,35.8,-81.7,17.9,-79.5,2.3C-77.2,-13.4,-58.7,-26.8,-42.7,-38.3C-26.8,-49.9,-13.4,-59.6,4,-63.6C21.4,-67.6,42.8,-65.9,59.2,-54.4Z"
									transform="translate(100 100)"
								/>
							</clipPath>
						</svg>
						<svg width="27rem" height="27rem" viewBox="0 0 250 250">
							<image
								xlinkHref={pic3}
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMid slice"
								clipPath="url(#clip03)"
							/>
						</svg>
						<p>Scambi Sounds Lab</p>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutExampleWorkshop;

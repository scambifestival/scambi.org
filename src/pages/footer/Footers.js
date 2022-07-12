import FooterTop from "./ FooterTop/FooterTop";
import FooterMiddle from "./ FooterMiddle/FooterMiddle";
import FooterBottom from "./ FooterBottom/FooterBottom";
import "./Footer.css";

function Footers() {
	return (
		<div className='footer'>
			<FooterTop />
			<FooterMiddle />
			<FooterBottom />
		</div>
	);
}

export default Footers;

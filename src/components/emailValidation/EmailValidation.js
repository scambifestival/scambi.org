import "./EmailValidation.css";

import React from "react";

const emailState = {
	email: "",
	error: ""
};
class FormComponent extends React.Component {
	constructor() {
		super();
		this.state = emailState;
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			email: e.target.value
		});
	}
	emailValidation() {
		const regex =
			/* eslint-disable no-useless-escape */
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!this.state.email || regex.test(this.state.email) === false) {
			this.setState({
				error: "Email is not valid!"
			});

			return false;
		}
		return true;
	}
	onSubmit(props) {
		console.log("clicked");
		if (this.emailValidation()) {
			console.log(this.state);
			this.setState(emailState);
		}
	}

	render() {
		return (
			<div>
				<div className={`mb-3 flex ${this.props.fileName === 'Footer' ? 'flex-col' : ''} ${this.props.classes || ''}`}>
					<input
						type="text"
						id="email"
						aria-describedby="helper-text-explanation"
						placeholder="Enter your email"
						value={this.state.email}
						onChange={this.onChange}
						className={
							"focus:outline-none focus:ring focus:ring-violet-800 w-38 h-12 rounded-md " +
							(this.state.error === "Email is not valid!"
								? " outline-none ring ring-red-500 "
								: " ") +
							(this.props.fileName === "NLSubscribe" && "inputForNL")
						}
					/>

					<span
						className={
							"incorrectText " +
							(this.props.fileName === "NLSubscribe" && "incorrectTextNL")
						}>
						{this.state.error}
					</span>
					<button
						onClick={() => this.onSubmit()}
						className={
							this.props.fileName === "Footer"
								? "purpledBtnNL"
								: "submit-button"
						}>
						Subscribe
					</button>
				</div>
			</div>
		);
	}
}

export default FormComponent;

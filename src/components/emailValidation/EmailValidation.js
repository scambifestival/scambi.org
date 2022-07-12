import "./EmailValidation.css";

import React from "react";

const emailState = {
	email: "",
	error: ""
};
class FormComponent extends React.Component {
	constructor(props) {
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
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!this.state.email || regex.test(this.state.email) === false) {
			this.setState({
				error: "Email is not valid!"
			});

			return false;
		}
		return true;
	}
	onSubmit() {
		if (this.emailValidation()) {
			console.log(this.state);
			this.setState(emailState);
		}
	}

	render() {
		return (
			<div>
				<div className="mb-3 flex flex-col">
					<input
						type="text"
						id="email"
						aria-describedby="helper-text-explanation"
						placeholder="Enter your email"
						value={this.state.email}
						onChange={this.onChange}
						className={
							"focus:outline-none focus:ring focus:ring-violet-800 w-38 h-12 rounded-md " +
							(this.state.error == "Email is not valid!"
								? " outline-none ring ring-red-500"
								: "")
						}
					/>

					<span className="incorrectText">{this.state.error}</span>
					<button onClick={() => this.onSubmit()}>Submit</button>
				</div>
				<div></div>
			</div>
		);
	}
}

export default FormComponent;

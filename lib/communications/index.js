export function subscribe(email) {
	fetch('https://api.buttondown.email/v1/subscribers', {
		method: 'POST',
		headers: {
			Authorization: 'Token ' + process.env.BUTTONDOWN,
		},
		body: {
			email: email,
		},
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}

export function contact(email, name, subject, message) {}

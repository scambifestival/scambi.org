module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				'3xl': '0 5px 3px 0px rgb(0 0 0 / 0.5)',
				'yellow-3xl': '0 5px 4px 0px rgb(155 149 6 / 0.7)',
			},
			borderWidth: {
				3: '3px',
			},
			colors: {
				purple: {
					250: '#edbbff',
					650: '#69088d',
					750: '#4e0968',
				},
				blue: {
					150: '#aab4d6',
				},
				yellow: {
					450: '#ffd166',
				},
				orange: {
					250: '#eebdad',
				},
			},
		},
	},
	plugins: [],
};

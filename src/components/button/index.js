import { useState } from 'react';

/*const styles = {
	primary: {
		base: 'text-white shadow-3xl',
		regular: 'purple bg-gradient-to-b from-fuchsia-800 to-transparent',
		hover: 'purple',
		active: 'dark-purple',
	},
	secondary: {
		base: 'shadow-lg',
		regular: 'purple-outline border-3 bg-transparent',
		hover: 'light-purple purple-outline border-3',
		active: 'bg-purple-900 text-white border-3 border-purple-900',
	},
	light: {
		base: 'shadow-3xl',
		regular: 'bg-white',
		hover: 'bg-gray-50',
		active: 'bg-gray-200',
	},
	action: {
		base: 'shadow-yellow-3xl',
		regular: 'yellow bg-gradient-to-b from-yellow-200 to-transparent',
		hover: 'yellow bg-gradient-to-b from-yellow-300 to-transparent',
		active: 'bg-yellow-400',
	},
};*/

export default function Button({
	children,
	href = '',
	styleType = 'primary',
	type = 'button',
	classes = '',
}) {
	//const [isMouseDown, setIsMouseDown] = useState(false);
	//const [isHovering, setIsHovering] = useState(false);
	const buttonStyle = 'btn-' + styleType;

	/*const handleMouseClick = (e) => {
		if (e.type.localeCompare('mouseup') === 0) {
			setIsMouseDown(false);
		} else if (e.type.localeCompare('mousedown') === 0) {
			setIsMouseDown(true);
		}
	};

	const handleMouseHover = (e) => {
		if (e.type.localeCompare('mouseover') === 0) {
			setIsHovering(true);
		} else if (e.type.localeCompare('mouseout') === 0) {
			setIsHovering(false);
			setIsMouseDown(false);
		}
	};*/

	return (
		<button
			type={type}
			class={`rounded-2xl font-semibold ${classes} ${buttonStyle} regular`}
			onClick={() => (window.location.href = href)}>
			{children}
		</button>
	);
}

import Card from '../../../../components/card';
import { Link } from 'react-router-dom';

export default function LabCard({ imgSrc, index, title, description }) {
	return (
		<Card key={index} classes='bg-white'>
			<div className='flex p-5 items-center'>
				<div className='text-left'>
					<h1 className='text-lg font-semibold mb-5'>{title}</h1>
					<p className='mb-10 w-[400px]'>{description}</p>
					<Link
						className='text-[#69088D] flex items-center'
						to={`/labs/${index}`}>
						Read more
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 ml-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17 8l4 4m0 0l-4 4m4-4H3'
							/>
						</svg>
					</Link>
				</div>
				<svg
					width='282'
					height='258'
					viewBox='0 0 282 258'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<defs>
						<pattern
							id='img'
							patternUnits='userSpaceOnUse'
							width='282'
							height='258'>
							<image
								href='https://picsum.photos/282/258'
								x='0'
								y='0'
								width='282'
								height='258'
							/>
						</pattern>
					</defs>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M170.442 11.7096C204.381 18.8402 242.989 19.868 264.504 46.3403C286.873 73.8645 283.241 110.797 278.205 144.303C272.884 179.703 265.768 217.594 235.669 238.188C204.579 259.459 160.798 264.066 124.08 249.752C91.019 236.863 83.1051 198.397 62.2472 170.58C40.1257 141.078 -1.99244 119.718 0.0732747 84.3713C2.21638 47.7003 37.1047 20.6977 71.8731 5.86908C102.524 -7.20361 136.807 4.64308 170.442 11.7096Z'
						fill='url(#img)'
					/>
				</svg>
				{/*<svg
					width='282'
					height='258'
					viewBox='0 0 397 344'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<clipPath id='clip-path'>
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M239.757 15.7453C287.315 25.2447 341.414 26.6139 371.562 61.8805C402.908 98.5482 397.818 147.749 390.762 192.387C383.306 239.547 373.335 290.026 331.158 317.46C287.592 345.797 226.244 351.935 174.792 332.866C128.464 315.695 117.375 264.45 88.1469 227.392C57.1488 188.09 -1.87007 159.635 1.02455 112.545C4.02761 63.6922 52.9156 27.7192 101.635 7.96455C144.586 -9.45091 192.626 6.33128 239.757 15.7453Z'
						/>
					</clipPath>
					<image
						clip-path='url(#clip-path)'
						xlinkHref='https://picsum.photos/200'
						src='https://picsum.photos/200'
						alt='Image'
					/>
  </svg>*/}
			</div>
		</Card>
	);
}

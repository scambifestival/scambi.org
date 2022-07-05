import { useParams } from 'react-router-dom';

function LabInfo() {
	let params = useParams();
	return (
		<div>
			<img src='https://picsum.photos/400/100' className='w-full' />
			<div className='mt-10 text-left p-20 w-3/4'>
				<h1 className='text-5xl mb-10'>Lorem Ipsum {params.labId}</h1>
				<p className='font-semibold mb-5'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in
					mollis nunc sed. Et molestie ac feugiat sed lectus.{' '}
				</p>
				Libero volutpat sed cras ornare. Nulla facilisi nullam vehicula ipsum a
				arcu cursus vitae. Magna fringilla urna porttitor rhoncus dolor purus
				non enim. Porta nibh venenatis cras sed felis eget velit. Felis bibendum
				ut tristique et. Integer malesuada nunc vel risus commodo. Amet risus
				nullam eget felis eget nunc. Eget sit amet tellus cras. Proin libero
				nunc consequat interdum varius sit amet mattis vulputate. Sed tempus
				urna et pharetra pharetra massa. Eu mi bibendum neque egestas congue
				quisque egestas diam in. Pharetra sit amet aliquam id diam maecenas
				ultricies mi. Egestas erat imperdiet sed euismod nisi porta lorem mollis
				aliquam. Aenean euismod elementum nisi quis eleifend quam adipiscing
				vitae proin. Eu tincidunt tortor aliquam nulla facilisi. Vitae purus
				faucibus ornare suspendisse sed nisi lacus sed. Eu turpis egestas
				pretium aenean pharetra magna. Blandit aliquam etiam erat velit
				scelerisque in dictum non. Proin fermentum leo vel orci porta non. Massa
				vitae tortor condimentum lacinia quis vel eros donec.
			</div>
			<div className='mt-10 p-20 flex justify-between'>
				<div className='text-left w-1/2'>
					<h2 className='text-xl'>Meet the Lab Host</h2>
					<p className='font-semibold mt-3 mb-5'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in
						mollis nunc sed. Et molestie ac feugiat sed lectus.{' '}
					</p>
					<p>
						Libero volutpat sed cras ornare. Nulla facilisi nullam vehicula
						ipsum a arcu cursus vitae. Magna fringilla urna porttitor rhoncus
						dolor purus non enim. Porta nibh venenatis cras sed felis eget
						velit. Felis bibendum ut tristique et. Integer malesuada nunc vel
						risus commodo. Amet risus nullam eget felis eget nunc. Eget sit amet
						tellus cras. Proin libero nunc consequat interdum varius sit amet
						mattis vulputate.{' '}
					</p>
				</div>
				<img src='https://picsum.photos/400' />
			</div>
		</div>
	);
}

export default LabInfo;

export async function getPinoli() {
	try {
		const response = await fetch(
			'https://api.baserow.io/api/database/rows/table/58806/?user_field_names=true&filter__field_341210__contains=pinolo',
			{
				method: 'GET',
				headers: { Authorization: 'Token ' + process.env.BASEROW },
			}
		);

		if (response.ok) {
			const pinoli = await response.json();
			return pinoli.results;
		} else {
			return response.status;
		}
	} catch (err) {}
}

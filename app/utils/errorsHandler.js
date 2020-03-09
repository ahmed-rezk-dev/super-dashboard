import history from './history';
const errorsHandler = data => {
	const { status } = data;
	switch (status) {
		case 403:
			history.push('/error', { ...data.data, status });
			break;
		default:
	}
};

export default errorsHandler;

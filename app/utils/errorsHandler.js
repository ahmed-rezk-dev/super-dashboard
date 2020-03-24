import { message } from 'antd';
import React from 'react';
import history from './history';
const inputErrorsHandler = errors => (
	<ul className="errorsHandlerContainer">
		{Object.keys(errors).map((err, index) => (
			<li key={index.toString()}>{errors[err].replace(/"/g, '')}</li>
		))}
	</ul>
);

const errorsHandler = data => {
	const { status } = data;
	switch (status) {
		case 403:
			history.push('/error', { ...data.data, status });
			break;
		case 422:
			message.error(inputErrorsHandler(data.data.errors), 10);
			break;
		case 400:
			message.error(data.data.msg, 10);
			break;
		default:
	}
};

export default errorsHandler;

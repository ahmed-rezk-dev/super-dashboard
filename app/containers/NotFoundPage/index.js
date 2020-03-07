/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import messages from './messages';

export default function NotFound({ location, history }) {
	const { state } = location;
	return (
		<div>
			<div direction="column" alignItems="center" justify="space-around">
				<div direction="column" justify="flex-start" alignItems="center">
					<h1>{state.status}</h1>
				</div>
				<div
					spacing={2}
					direction="column"
					justify="flex-end"
					alignItems="center"
				>
					<div>
						<h4>
							<FormattedMessage {...messages.text_0} />
						</h4>
					</div>
					<div>
						<p>{state.msg}</p>
					</div>
					<div>
						<Button onClick={() => history.goBack()}>
							<FormattedMessage {...messages.go_back} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

NotFound.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object,
};

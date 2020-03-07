/* eslint-disable import/no-cycle */
/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import loadable from 'utils/loadable';
import { Spin } from 'antd';
export default loadable(() => import('./index'), {
	fallback: (
		<Spin
			size="large"
			tip="Loading..."
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		/>
	),
});

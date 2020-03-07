/**
 *
 * Asynchronously loads the component for Dashboard
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import { Spin } from 'antd';

export default loadable(() => import('./index'), {
	fallback: <Spin size="large" tip="Loading..." className="main-spin" />,
});

/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Card, Row } from 'antd';

import io from 'socket.io-client';
// Components
import Metric from 'components/Metric';
import MemoryMonitor from 'components/MemoryMonitor';
import CpuMonitor from 'components/CpuMonitor';

import { getAccount } from './actions';
import makeSelectDashboard from './selectors';
// import messages from './messages';
import reducer from './reducer';
import {
	MessagesSvg,
	MoneyBagSvg,
	OrdersSvg,
	UsersSvg,
} from '../../assets/svg';
import saga from './saga';

// socket connection
const port = '';
const socketPath = '/socket.io';
const socket = io(
	`${window.location.protocol}//${window.location.hostname}:${port ||
		window.location.port}`,
	{
		path: socketPath,
		reconnectionDelayMax: 7000,
	}
);

// Monitor arrays
let cpuData = [];
let memoryData = [];

// Reset Monitor arrays
function resetData() {
	cpuData = cpuData.slice(cpuData.length - 10, cpuData.length);
	memoryData = memoryData.slice(memoryData.length - 10, memoryData.length);
}

export function Dashboard() {
	useInjectReducer({
		key: 'dashboard',
		reducer,
	});
	useInjectSaga({
		key: 'dashboard',
		saga,
	});

	const [cpu] = useState([
		{
			data: cpuData.slice(),
		},
	]);
	const [memory] = useState([
		{
			data: memoryData.slice(),
		},
	]);

	useEffect(() => {
		socket.on('esm_stats', socketData => {
			const { os } = socketData;
			if (os) {
				cpuData.push(os.cpu.toFixed(1));
				memoryData.push(os.memory.toFixed(1));
			}
			// eslint-disable-next-line no-undef
			ApexCharts.exec('memoryMonitor', 'updateSeries', [
				{
					data: memoryData,
				},
			]);
			// eslint-disable-next-line no-undef
			ApexCharts.exec('cpuMonitor', 'updateSeries', [
				{
					data: cpuData,
				},
			]);
			if (cpuData.length > 100) {
				resetData();
			}
		});
		return function cleanup() {
			resetData();
		};
	}, []);

	return (
		<div>
			{/* Metric Cards */}
			<Row gutter={16} type="flex" justify="space-around">
				<Metric
					color="#2dce89"
					icon={UsersSvg}
					title="Users Total"
					count="100,000"
				></Metric>
				<Metric
					color="#f5365c"
					icon={MessagesSvg}
					title="Messages Total"
					count="10,000"
				></Metric>
				<Metric
					color="#1890ff"
					icon={OrdersSvg}
					title="Orders Total"
					count="20,000"
				></Metric>
				<Metric
					color="#613cea"
					icon={MoneyBagSvg}
					title="Money Total"
					count="60,000"
				></Metric>
			</Row>

			{/* Monitor */}
			<Card
				type="inner"
				title="Performance Monitor"
				extra={<a href="/#">More</a>}
			>
				<Row justify="space-around" align="middle">
					<MemoryMonitor data={memory} />
					<CpuMonitor data={cpu} />
				</Row>
			</Card>
		</div>
	);
}

Dashboard.propTypes = {
	fetchAccount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
	return {
		fetchAccount: () => dispatch(getAccount()),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Dashboard);

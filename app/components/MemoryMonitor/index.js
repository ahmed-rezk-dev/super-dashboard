/**
 *
 * MemoryMonitor
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Col } from 'antd';
import Chart from 'react-apexcharts';
import messages from './messages';

let latestResult = 5;

function MemoryMonitor({ data }) {
	const options = {
		chart: {
			id: 'memoryMonitor',
			height: 100,
			type: 'line',
			animations: {
				enabled: true,
				easing: 'linear',
				dynamicAnimation: {
					speed: 1000,
				},
			},
			events: {
				updated: (chartContext, config) => {
					const seriesData = config.config.series[0].data;
					latestResult = `${seriesData[seriesData.length - 1]} MB`;
					document.getElementById('latestResult').innerHTML = latestResult;
				},
			},
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			range: 10,
		},
		yaxis: {
			title: {
				text: 'Used',
				style: {
					fontSize: '16px',
				},
			},
		},
		legend: {
			show: false,
		},
	};
	return (
		<Col span={12}>
			<Col className="chart-title">
				<h1 id="latestResult">0</h1>
				<h4>Memory Usage</h4>
			</Col>
			<Col span={22}>
				<Chart options={options} series={data} type="line" height={200} />
			</Col>
		</Col>
	);
}

MemoryMonitor.propTypes = {
	data: PropTypes.array,
};

export default memo(MemoryMonitor);

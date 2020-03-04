/**
 *
 * CpuMonitor
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Col } from 'antd';
import Chart from 'react-apexcharts';
import messages from './messages';

let latestResult = 5;

const options = {
	chart: {
		id: 'cpuMonitor',
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
				const { data } = config.config.series[0];
				latestResult = `${data[data.length - 1]} %`;
				document.getElementById('latestResultCpu').innerHTML = latestResult;
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
		colors: '#f5355c',
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

function CpuMonitor({ data }) {
	return (
		<Col span={12}>
			<Col className="chart-title">
				<h1 id="latestResultCpu">0</h1>
				<h4>CPU Usage</h4>
			</Col>
			<Col span={22}>
				<Chart options={options} series={data} type="line" height={200} />
			</Col>
		</Col>
	);
}

CpuMonitor.propTypes = {
	data: PropTypes.array,
};

export default memo(CpuMonitor);

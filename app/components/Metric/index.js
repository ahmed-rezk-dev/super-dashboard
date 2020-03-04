/**
 *
 * Metric̣
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Col, Row, Icon } from 'antd';
import messages from './messages';

function Metric({ color, icon, count, title }) {
	return (
		<Row type="flex" className="metric">
			<Col className="metric-left" style={{ backgroundColor: color }}>
				{/* <Icon className="metric-icon" type="user" /> */}
				<Icon component={icon} className="metric-icon" />
			</Col>
			<Col className="metric-right">
				<strong className="metric-count">{count}</strong>
				<p className="metric-text">{title}</p>
			</Col>
		</Row>
	);
}

Metric.propTypes = {};

export default Metric;

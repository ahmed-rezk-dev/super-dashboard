/**
 *
 * Metric̣
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Icon from '@ant-design/icons';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const MetricContainer = styled(Row)`
	background: ${props => props.theme.colors.white};
	max-width: 600px;
	min-height: fit-content;
	margin-right: auto;
	margin-left: auto;
	margin-top: 2rem;
	margin-bottom: 5rem;
	border-radius: 12px;
	box-sizing: border-box;
	text-align: center;
	overflow: hidden;
	justify-content: space-between;
`;
const MetricLeft = styled(Col)`
	display: flex;
	padding: 0.1rem 1.5rem;
`;
const MetricRight = styled(Col)`
	padding: 0.1rem 1rem;
`;
const MetricIcon = styled(Icon)`
	align-self: center;
	width: 4rem;
`;
const MetricCount = styled.strong`
	display: block;
	margin: 1rem 0;
	font-size: xx-large;
`;
const MetricCountTitle = styled.p`
	display: block;
	margin: 1rem;
`;
function Metric({ color, icon, count, title }) {
	return (
		<MetricContainer type="flex">
			<MetricLeft style={{ background: color }}>
				<MetricIcon component={icon} />
			</MetricLeft>
			<MetricRight>
				<MetricCount>{count}</MetricCount>
				<MetricCountTitle>{title}</MetricCountTitle>
			</MetricRight>
		</MetricContainer>
	);
}

Metric.propTypes = {
	color: PropTypes.string,
	count: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.func,
};

export default Metric;

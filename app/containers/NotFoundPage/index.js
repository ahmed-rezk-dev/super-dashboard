/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { MainContainer, Separator, LoginHeader } from 'components/Login';
import { SpiderSvg } from 'assets/svg';
import { Spring } from 'react-spring/renderprops';
import messages from './messages';

const ErrorTopContainer = styled(LoginHeader)`
	padding-bottom: 3rem;
`;

const StatusText = styled.h1`
	color: ${props => props.theme.colors.white};
	text-align: center;
	font-size: 8rem;
	letter-spacing: 1rem;
`;
const ErrorText = styled.p`
	color: ${props => props.theme.colors.white};
	text-align: center;
	font-size: 3rem;
`;
const ErrorDesc = styled.p`
	color: ${props => props.theme.colors.white};
	text-align: center;
	font-size: 2rem;
`;

const ErrorIcon = styled(Icon)`
	position: absolute;
	z-index: 1;
	left: 5rem;
`;

export default function NotFound({ location, history }) {
	const { state } = location;
	return (
		<MainContainer>
			<Spring from={{ top: '-165px' }} to={{ top: '1px' }}>
				{props => <ErrorIcon style={props} component={SpiderSvg} />}
			</Spring>
			<ErrorTopContainer>
				<StatusText>{state ? state.status : 404}</StatusText>
				<Separator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						version="1.1"
						viewBox="0 0 2560 100"
						x="0"
						y="0"
					>
						<polygon
							className="separator-polygon"
							points="2560 0 2560 100 0 100"
						></polygon>
					</svg>
				</Separator>
			</ErrorTopContainer>
			<Row justify="center">
				<Col span={24}>
					<ErrorText>
						<FormattedMessage {...messages.text_0} />
					</ErrorText>
				</Col>
				<Col span={24}>
					<ErrorDesc>{state ? state.msg : 'Page Not Found!'}</ErrorDesc>
				</Col>
				<Button onClick={() => history.push('/')} size="large">
					<FormattedMessage {...messages.go_back} />
				</Button>
			</Row>
		</MainContainer>
	);
}

NotFound.propTypes = {
	location: PropTypes.object,
	history: PropTypes.object,
};

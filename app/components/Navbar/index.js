/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// core components
import { Layout, Icon, Row, Col } from 'antd';
import { Spring, animated } from 'react-spring/renderprops';
import styled from 'styled-components';
import UserMenu from 'components/UserMenu';
import NotificationsMenu from 'components/NotificationsMenu';

const CustomBreadcrumb = React.lazy(() =>
	import('components/CustomBreadcrumb')
);
const { Header } = Layout;

// #region  mainContainer styles
export const MainContainer = styled(Header)`
	padding: 0;
	z-index: 1;
	background: #eee;
	border: 1px solid #eee;
	border-radius: 5px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.09);
	margin: 24px 24px 10px 24px;
`;
// #endregion
function Navbar({ collapsed, toggle, history, currentRoute }) {
	const childProps = { history };

	return (
		<Spring
			native
			from={{ opacity: 0, transform: 'translate3d(0,-140px,0)' }}
			to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
		>
			{props => (
				<animated.div style={props}>
					<MainContainer>
						<Row type="flex" align="middle">
							<Col span={1}>
								{/* <Icon
									className="trigger"
									type={collapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={toggle}
								/> */}
							</Col>
							<Col span={21}>
								<CustomBreadcrumb
									history={history}
									currentRoute={currentRoute}
								/>
							</Col>
							<Col>
								<NotificationsMenu {...childProps} />
								<UserMenu {...childProps} />
							</Col>
						</Row>
					</MainContainer>
				</animated.div>
			)}
		</Spring>
	);
}

Navbar.propTypes = {
	collapsed: PropTypes.bool,
	toggle: PropTypes.func,
	history: PropTypes.object,
	currentRoute: PropTypes.object,
};

export default memo(Navbar);

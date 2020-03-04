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
// Style
import './style.less';
import UserMenu from 'components/UserMenu';
import NotificationsMenu from 'components/NotificationsMenu';
const CustomBreadcrumb = React.lazy(() =>
	import('components/CustomBreadcrumb')
);
const { Header } = Layout;
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
					<Header className="mainContainer">
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
									className="breadcrumb"
									history={history}
									currentRoute={currentRoute}
								/>
							</Col>
							<Col>
								<NotificationsMenu {...childProps} />
								<UserMenu {...childProps} />
							</Col>
						</Row>
					</Header>
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

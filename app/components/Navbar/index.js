/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// core components
import { Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Spring, animated } from 'react-spring/renderprops';
import UserMenu from 'components/UserMenu';
import NotificationsMenu from 'components/NotificationsMenu';
import { TriggerBtn, MainContainer } from 'Styled/Navbar';

const CustomBreadcrumb = React.lazy(() =>
	import('components/CustomBreadcrumb')
);
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
								<TriggerBtn
									onClick={toggle}
									icon={
										collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
									}
									size="large"
									ghost
								/>
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

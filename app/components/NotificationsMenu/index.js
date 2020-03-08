/**
 *
 * NotificationsMenu
 *
 */
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Badge, Button, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { DropdownContainer } from 'Styled/DropdownMenu';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function NotificationsMenu() {
	const notificationsMenu = (
		<Menu>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.alipay.com/"
				>
					1st menu item 2nd menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.taobao.com/"
				>
					2nd menu item 2nd menu item 2nd menu item
				</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.tmall.com/"
				>
					3rd menu item 2nd menu item 2nd menu item
				</a>
			</Menu.Item>
		</Menu>
	);
	return (
		<DropdownContainer overlay={notificationsMenu} placement="bottomLeft">
			<Badge count={1}>
				<Button icon={<BellOutlined />} />
			</Badge>
		</DropdownContainer>
	);
}

NotificationsMenu.propTypes = {};

export default memo(NotificationsMenu);

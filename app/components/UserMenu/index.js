/**
 *
 * UserMenu
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Menu, Button } from 'antd';
import {
	MenuOutlined,
	UserOutlined,
	SettingOutlined,
	BulbOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { DropdownContainer, DropMenuItem } from 'Styled/DropdownMenu';
import { removeAuthToken } from '../../utils/Auth';
import { setCurrentUser } from '../../containers/App/actions';
import configureStore from '../../configureStore';
import messages from './messages';

const store = configureStore();

function UserMenu({ history }) {
	const logout = () => {
		removeAuthToken();
		store.dispatch(setCurrentUser(null));
		history.go('/auth/login');
	};

	const userMenu = (
		<Menu>
			<DropMenuItem>
				<a rel="noopener noreferrer" href="#....">
					<UserOutlined />
					My Profile
				</a>
			</DropMenuItem>
			<DropMenuItem>
				<a rel="noopener noreferrer" href="#....">
					<SettingOutlined />
					Settings
				</a>
			</DropMenuItem>
			<DropMenuItem>
				<a rel="noopener noreferrer" href="#....">
					<BulbOutlined />
					Support
				</a>
			</DropMenuItem>
			<Menu.Divider />
			<DropMenuItem onClick={() => logout()}>
				<div>
					<LogoutOutlined />
					<FormattedMessage {...messages.logout} />
				</div>
			</DropMenuItem>
		</Menu>
	);

	return (
		<DropdownContainer overlay={userMenu} placement="bottomLeft">
			<Button icon={<MenuOutlined />} />
		</DropdownContainer>
	);
}

UserMenu.propTypes = {
	history: PropTypes.object,
};

export default memo(UserMenu);

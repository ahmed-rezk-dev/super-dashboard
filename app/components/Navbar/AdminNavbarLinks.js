// import { FormattedMessage } from 'react-intl';
// import Dashboard from '@material-ui/icons/Dashboard';
// import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
// import Search from '@material-ui/icons/Search';

import { useTheme } from '@material-ui/core';
// import Button from '../Button/index';
// import CustomInput from '../CustomInput/index';
// import NotificationsMenu from '../NotificationsMenu';
// import UserMenu from '../UserMenu';
import Style from '../../Styles/linksStyle';
// import messages from './messages';

function AdminNavbarLinks(props) {
	const theme = useTheme();
	const classes = Style(theme);
	return (
		<div>
			{/* <div className={classes.searchWrapper}>
				<CustomInput
					formControlProps={{
						className: `${classes.margin} ${classes.search}`,
					}}
					inputProps={{
						placeholder: 'Search',
						inputProps: {
							'aria-label': 'Search',
						},
					}}
				/>
				<Button color="white" aria-label="edit" justIcon round>
					<Search />
				</Button>
			</div>
			<Button
				color={window.innerWidth > 959 ? 'transparent' : 'white'}
				justIcon={window.innerWidth > 959}
				simple={!(window.innerWidth > 959)}
				aria-label="Dashboard"
				className={classes.buttonLink}
			>
				<Dashboard className={classes.icons} />
				<Hidden mdUp implementation="css">
					<p className={classes.linkText}>
						<FormattedMessage {...messages.dashboard} />
					</p>
				</Hidden>
			</Button>

			Notifications 
			<NotificationsMenu /> */}

			{/* User menu 
			<UserMenu {...props} /> */}
		</div>
	);
}

AdminNavbarLinks.propTypes = {};

export default memo(AdminNavbarLinks);

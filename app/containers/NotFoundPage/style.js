import { whiteColor } from '../../Styles/material-dashboard-react';
import pageBG from '../../images/error_bg.gif';

const errorsPageStyle = makeStyles({
	pageBG: {
		border: 0,
		height: '400px',
		margin: 0,
		display: 'flex!important',
		padding: '100px 0',
		overflow: 'hidden',
		position: 'relative',
		minHeight: '100vh',
		backgroundColor: whiteColor,
		backgroundImage: `url(${pageBG})`,
		backgroundPosition: 'center center',
	},
	status_code_title: {},
	contant_box_404: {},
});

export default errorsPageStyle;

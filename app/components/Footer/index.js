/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Footer } = Layout;
const styled = { textAlign: 'center' };
function FooterC() {
	return (
		<Footer style={styled}>React Dashboard ©2020 Created by Ahmed Rezk</Footer>
	);
}

FooterC.propTypes = {};

export default FooterC;

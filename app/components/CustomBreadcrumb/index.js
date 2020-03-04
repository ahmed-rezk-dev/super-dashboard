/**
 *
 * CustomBreadcrumb
 *
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';

function CustomBreadcrumb({ currentRoute }) {
	const MdIcon = Icons[currentRoute.icon];
	// const GruopIcon = Icons[currentRoute.group.name];
	const breadcrumbFunc = () => (
		<>
			{currentRoute.group !== undefined ? (
				<Breadcrumb.Item>
					{/* <div>{currentRoute.group.icon}</div> */}
					<span>{currentRoute.group.name}</span>
				</Breadcrumb.Item>
			) : null}
			<Breadcrumb.Item>
				<MdIcon />
				{/* {currentRoute.icon} */}
				<span>{currentRoute.name}</span>
			</Breadcrumb.Item>
		</>
	);

	return (
		<Breadcrumb className="breadcrumb">
			<Breadcrumb.Item>
				<Icons.HomeOutlined />
				<span>Home</span>
			</Breadcrumb.Item>
			{breadcrumbFunc()}
		</Breadcrumb>
	);
}

CustomBreadcrumb.propTypes = {
	currentRoute: PropTypes.object,
};

export default CustomBreadcrumb;

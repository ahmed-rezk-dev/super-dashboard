/**
 *
 * CustomBreadcrumb
 *
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BreadcrumbContainer } from 'Styled/Navbar';

function CustomBreadcrumb({ currentRoute }) {
	const MdIcon = Icons[currentRoute.icon];
	const GroupIcon = currentRoute.group ? Icons[currentRoute.group.icon] : '';
	const breadcrumbFunc = () => (
		<>
			{currentRoute.group !== undefined ? (
				<Breadcrumb.Item>
					<GroupIcon />
					<span>{currentRoute.group.name}</span>
				</Breadcrumb.Item>
			) : null}
			<Breadcrumb.Item>
				<MdIcon />
				<span>{currentRoute.name}</span>
			</Breadcrumb.Item>
		</>
	);

	return (
		<BreadcrumbContainer>
			<Breadcrumb.Item>
				<Icons.HomeOutlined />
				<span>Home</span>
			</Breadcrumb.Item>
			{breadcrumbFunc()}
		</BreadcrumbContainer>
	);
}

CustomBreadcrumb.propTypes = {
	currentRoute: PropTypes.object,
};

export default CustomBreadcrumb;

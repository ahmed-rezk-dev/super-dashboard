/**
 *
 * Roles
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// UI
import { Table, Input, Button, Popconfirm, Form, Modal, Card } from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import TableSkeleton from 'components/TableSkeleton';
import moment from 'moment';
import makeSelectRoles from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
	rolesRequest,
	rolesAdd,
	rolesEdit,
	rolesDelete,
	toggleAddModal,
	toggleEditModal,
} from './actions';
import styled from 'styled-components';
export function Roles({
	fetchRoles,
	roles,
	addRoles,
	editRoles,
	deleteRoles,
	toggleAddModalAction,
	toggleEditModalAction,
}) {
	useInjectReducer({ key: 'roles', reducer });
	useInjectSaga({ key: 'roles', saga });
	const [editFromValues, setEditFromValues] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		fetchRoles();
	}, []);

	const openEditModalHandler = record => {
		const index = roles.data.indexOf(record);
		toggleEditModalAction();
		setEditFromValues({ index, _id: record._id });
		form.setFieldsValue({ name: record.name });
	};

	// Edit sublimation func
	const handleEdit = () => {
		const values = form.getFieldValue();
		editRoles({ ...values, ...editFromValues });
	};
	// Add sublimation func
	const handleAdd = () => {
		const values = form.getFieldValue();
		addRoles(values);
	};

	const afterCloseHandler = () => {
		form.resetFields();
	};

	const handleDelete = record => {
		const index = roles.data.indexOf(record);
		deleteRoles({ index, id: record._id });
	};

	const dataSource = [
		{
			key: 1,
			name: 'Mike',
			createdAt: '2019-10-30T05:27:45.355Z',
			updatedAt: '2019-10-30T05:27:45.355Z',
		},
	];

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: time => moment(time).format('ddd, MMM D, YYYY, h:mm.a'),
		},
		{
			title: 'Last Update',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: time => moment(time).format('ddd, MMM D, YYYY, h:mm.a'),
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			align: 'right',
			// eslint-disable-next-line react/display-name
			render: (text, record) =>
				dataSource.length >= 1 ? (
					<div className="ml-3">
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={() => openEditModalHandler(record)}
						>
							Edit
						</Button>
						<Popconfirm
							title="Sure to delete?"
							onConfirm={() => handleDelete(record)}
						>
							<Button type="danger" icon={<DeleteOutlined />}>
								Delete
							</Button>
						</Popconfirm>
					</div>
				) : null,
		},
	];

	const AddButton = styled(Button)`
		display: block;
		margin: 1rem auto;
	`;

	return (
		<div>
			<AddButton
				type="primary"
				size="large"
				title="Add New"
				icon={<PlusCircleOutlined />}
				onClick={() => toggleAddModalAction()}
			>
				Add New
			</AddButton>
			<Card>
				<Table dataSource={roles.data} columns={columns} rowKey="_id" />
			</Card>
			<Modal
				title="Edit"
				visible={roles.toggleEditModal}
				onOk={handleEdit}
				onCancel={() => toggleEditModalAction()}
				afterClose={() => afterCloseHandler()}
			>
				<Form form={form}>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: 'Please enter role name!',
							},
						]}
					>
						<Input placeholder="Role Name" size="large" />
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Add"
				visible={roles.toggleAddModal}
				onOk={handleAdd}
				onCancel={() => toggleAddModalAction()}
				confirmLoading={roles.isLoading}
			>
				<Form form={form}>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: 'Please enter role name!',
							},
						]}
					>
						<Input placeholder="Role Name" size="large" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

Roles.propTypes = {
	fetchRoles: PropTypes.func.isRequired,
	addRoles: PropTypes.func.isRequired,
	editRoles: PropTypes.func.isRequired,
	deleteRoles: PropTypes.func.isRequired,
	roles: PropTypes.object.isRequired,
	toggleAddModalAction: PropTypes.func.isRequired,
	toggleEditModalAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	roles: makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
	return {
		fetchRoles: () => dispatch(rolesRequest()),
		addRoles: payload => dispatch(rolesAdd(payload)),
		editRoles: payload => dispatch(rolesEdit(payload)),
		deleteRoles: payload => dispatch(rolesDelete(payload)),
		toggleAddModalAction: () => dispatch(toggleAddModal()),
		toggleEditModalAction: () => dispatch(toggleEditModal()),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Roles);

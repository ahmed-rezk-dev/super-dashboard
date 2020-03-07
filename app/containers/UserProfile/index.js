/**
 *
 * UserProfile
 *
 */

import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Col, Upload, message, Card } from 'antd';
import {
	SettingOutlined,
	LoadingOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import UserEditForm from 'components/UserEditForm';
import makeSelectUserProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const tabList = [
	{
		key: 'tab1',
		tab: 'General',
	},
	{
		key: 'tab2',
		tab: 'Change Password',
	},
];

// const contentList = {
// 	tab1: <UserEditForm />,
// 	tab2: <p>content2</p>,
// };
export function UserProfile({ user }) {
	console.log('user:', user);
	useInjectReducer({ key: 'userProfile', reducer });
	useInjectSaga({ key: 'userProfile', saga });

	const contentList = useCallback(
		{
			tab1: <UserEditForm fetching={user.fetching} />,
			tab2: <p>content2</p>,
		},
		[]
	);

	const [state, setState] = useState({ loading: false });
	const [stateTabs, setTabsState] = useState({
		key: 'tab1',
		noTitleKey: 'app',
	});

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = info => {
		if (info.file.status === 'uploading') {
			setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				setState({
					imageUrl,
					loading: false,
				})
			);
		}
	};

	const uploadButton = (
		<div>
			{state.loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div>Upload</div>
		</div>
	);

	const onTabChange = (key, type) => {
		console.log(key, type);
		setTabsState({ [type]: key });
	};
	const { imageUrl } = state;

	// Styled
	const UploadStyled = styled(Upload)`
		.ant-upload {
			width: 128px;
			height: 128px;
		}
	`;

	const StyledCard = styled(Card)`
		margin-bottom: 3rem;
		.ant-card-body {
			align-items: center;
			display: flex;
		}
	`;

	const UserInfo = styled(Col)`
		display: flex;
		flex-direction: column;
		justify-content: center;
		span {
			color: #adb5bd;
		}
	`;

	const CardTitle = styled.div`
		display: flex;
		align-items: center;
		font-weight: 400;
		margin-bottom: 0.5rem;
		span {
			margin-left: 0.5rem;
		}
	`;

	return (
		<>
			<StyledCard>
				<Col span={3}>
					<UploadStyled
						name="avatar"
						listType="picture-card"
						showUploadList={false}
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{imageUrl ? (
							<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
						) : (
							uploadButton
						)}
					</UploadStyled>
				</Col>
				<UserInfo span={6}>
					<h3>{user.profile === undefined ? user.email : user.profile.name}</h3>
					<span>{user.role.name}</span>
				</UserInfo>
			</StyledCard>
			{/* Tabs */}
			<Card
				title={
					<CardTitle>
						<SettingOutlined />
						<span>Settings</span>
					</CardTitle>
				}
				tabList={tabList}
				onTabChange={key => {
					onTabChange(key, 'key');
				}}
			>
				{contentList[stateTabs.key]}
			</Card>
		</>
	);
}

UserProfile.propTypes = {
	user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
	user: makeSelectUserProfile(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserProfile);

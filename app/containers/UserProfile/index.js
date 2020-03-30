/**
 *
 * UserProfile
 *
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
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
import {
	getPlaceAction,
	getPlaceReverseAction,
	getPlaceLoadingAction,
} from 'containers/Maps/actions';
import makeSelectMap from 'containers/Maps/selectors';
import makeSelectUserProfile, {
	makeSelectUserProfileDomain,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import mapReducer from '../Maps/reducer';
import mapSaga from '../Maps/saga';
import { userUpdateAction, userUpdateCurrentAction } from './actions';

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

// #region Styles
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
// #endregion

export function UserProfile({
	userUpdateState,
	user,
	mapData,
	getPlaceReverse,
	loadingAction,
	seacrhPlaces,
	updateUser,
	userUpdateCurrent,
}) {
	useInjectReducer({ key: 'userProfile', reducer });
	useInjectSaga({ key: 'userProfile', saga });
	useInjectReducer({ key: 'map', reducer: mapReducer });
	useInjectSaga({ key: 'map', saga: mapSaga });

	const [uploadeState, setUploadeState] = useState({ loading: false });
	const [stateTabs, setTabsState] = useState({
		key: 'tab1',
		noTitleKey: 'app',
	});

	useEffect(() => {
		setUploadeState({ loading: false, imageUrl: user.profile.picture });
	}, []);

	const { profile } = user;
	const { location } = profile;

	const initialValues = {
		...location,
		...profile,
		email: user.email,
		_id: user._id,
	};

	const contentList = useCallback(
		{
			tab1: (
				<UserEditForm
					userFetching={userUpdateState.fetching}
					initialValues={initialValues}
					mapData={mapData}
					getPlaceReverse={getPlaceReverse}
					loadingAction={loadingAction}
					seacrhPlaces={seacrhPlaces}
					updateUser={updateUser}
				/>
			),
			tab2: <p>content2</p>,
		},
		[mapData, userUpdateState]
	);

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

	const handleFileChange = info => {
		console.log('info:', info);
		if (info.file.status === 'uploading') {
			setUploadeState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			userUpdateCurrent({
				token: info.file.response.token,
				refreshToken: info.file.response.refreshToken,
			});
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				setUploadeState({
					imageUrl,
					loading: false,
				})
			);
		}
	};

	const uploadButton = (
		<div>
			{uploadeState.loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div>Upload</div>
		</div>
	);

	const onTabChange = (key, type) => {
		setTabsState({ [type]: key });
	};

	const customRequest = data => {
		console.log('data:', data);
	};
	const { imageUrl } = uploadeState;
	return (
		<>
			<StyledCard>
				<Col xs={4} sm={4} md={3} lg={3} xl={2}>
					<UploadStyled
						name="avatar"
						listType="picture-card"
						showUploadList={false}
						action={`/api/update/avatar/${user._id}`}
						beforeUpload={beforeUpload}
						onChange={handleFileChange}
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
	userUpdateState: PropTypes.object,
	user: PropTypes.object,
	mapData: PropTypes.object,
	loadingAction: PropTypes.func,
	seacrhPlaces: PropTypes.func,
	getPlaceReverse: PropTypes.func,
	updateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	user: makeSelectUserProfile(),
	userUpdateState: makeSelectUserProfileDomain(),
	mapData: makeSelectMap(),
});

function mapDispatchToProps(dispatch) {
	return {
		seacrhPlaces: query => dispatch(getPlaceAction(query)),
		getPlaceReverse: value => dispatch(getPlaceReverseAction(value)),
		loadingAction: () => dispatch(getPlaceLoadingAction(true)),
		updateUser: data => dispatch(userUpdateAction(data)),
		userUpdateCurrent: data => dispatch(userUpdateCurrentAction(data)),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserProfile);

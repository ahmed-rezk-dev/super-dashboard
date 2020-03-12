import styled from 'styled-components';
import { Spin } from 'antd';

export const Loader = styled(Spin)`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

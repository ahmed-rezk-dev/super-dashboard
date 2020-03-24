import { createGlobalStyle } from 'styled-components';
// Colors
const defaultColor = '#172b4d';
const primaryColor = '#6064f4';
const infoColor = '#0fceef';
const successColor = '#2dce89';
const warningColor = '#fb6340';
const dangerColor = '#f5365c';
const normalColor = '#d9d9d9';
const secondaryColor = '#f7fafc';
const linkColor = '#1890ff';
const layoutHeaderBackground = ' #6064f4';
const layoutBodyBackground = '#f0f2f5';
const textColor = 'rgba(0, 0, 0, 0.65)';
const textColorSecondary = 'rgba(0, 0, 0, 0.45)';
const disabledColor = 'rgba(0, 0, 0, 0.25)';
const borderRadiusBase = '4px';
const borderColorBase = '#d9d9d9';
const boxShadowBase = '0 2px 8px rgba(0, 0, 0, 0.15)';
const white = '#fff';
const black = '#000';
const headingColor = '#525f7f';
const headingSmallColor = '#adb5bd';

// #eregion Responsive breakpoints
const xsSize = '576px';
const smSize = '576px';
const mdSize = '768px';
const lgSize = '960px';
const xlSize = '1140px';

// Extra small devices (portrait phones, less than 576px)
const xs = style => `@media (max-width: 575.98px) { ${style} }`;
// Small devices (landscape phones, 576px and up)
const sm = style =>
	`@media (min-width: 576px) and (max-width: 767.98px) { ${style} }`;
// Medium devices (tablets, 768px and up)
const md = style =>
	`@media (min-width: 768px) and (max-width: 991.98px) { ${style} }`;
// Large devices (desktops, 992px and up)
const lg = style =>
	`@media (min-width: 992px) and (max-width: 1199.98px) { ${style} }`;
// Extra large devices (large desktops, 1200px and up)
const xl = style => `@media (min-width: 1200px) { ${style} }`;
// XX large devices (large desktops, 1200px and up)
const xxl = style => `@media only screen and (min-width: 1441px) { ${style} }`;
// #endregion

const verticalAlign = `
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const theme = {
	colors: {
		defaultColor,
		primaryColor,
		infoColor,
		successColor,
		warningColor,
		dangerColor,
		normalColor,
		secondaryColor,
		linkColor,
		layoutHeaderBackground,
		layoutBodyBackground,
		headingColor,
		textColor,
		textColorSecondary,
		disabledColor,
		borderColorBase,
		boxShadowBase,
		white,
		black,
		headingSmallColor,
	},
	fonts: ['sans-serif', 'Roboto'],
	fontSizes: {
		small: '1em',
		medium: '2em',
		large: '3em',
	},
	spaces: {
		borderRadiusBase,
	},
	grid: { xsSize, smSize, mdSize, lgSize, xlSize, xs, sm, md, lg, xl, xxl },
	utilities: { verticalAlign },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
	font-size: 1rem;
  }
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: 'Montserrat', 'Open Sans', -apple-system,
	'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans',
	sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
	'Noto Color Emoji';
}
h1 {
	font-weight: 600;
}
.anticon {
	svg {
		display: block;
	}
}
.main-spin {
  position: absolute;
  left: 50%;
  top: 50%;
	transform: translate(-50%, -50%);
}
.errorsHandlerContainer {
	display: block;
	padding: 1rem 5rem 0.5rem;
	li {
		width: 100%;
		text-align: left;
		line-height: 2rem;
		font-size: 1rem;
	}
}
`;

export default theme;

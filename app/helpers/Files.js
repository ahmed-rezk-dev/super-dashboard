const getFile = path => {
	const siteUrl = `${window.location.protocol}//${window.location.host}`;
	if (path) {
		return `${siteUrl}/api/getFile?path=${path}`;
	}
	return false;
};

export { getFile };

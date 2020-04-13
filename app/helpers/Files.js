const getFile = path => {
	if (path) {
		return `http://${window.location.hostname}:8080/api/getFile?path=${path}`;
	}
	return false;
};

export { getFile };

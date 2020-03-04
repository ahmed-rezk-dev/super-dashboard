const httpMethodsMapper = {
	GET: 'read',
	POST: 'create',
	PUT: 'write',
	DELETE: 'delete',
};

const isUserAuthorized = ({ method, user, baseUrl }, res, next) => {
	const isHttpMethodNotAllowed = !httpMethodsMapper.hasOwnProperty(method);
	const baseUrlToArray = baseUrl.split('/');
	const currentUrlPath = baseUrlToArray[baseUrlToArray.length - 1];

	if (user.role !== null) {
		if (isHttpMethodNotAllowed) {
			return res.status(405).json({
				status: 'error',
				msg: 'Method Not Allowed.',
			});
		}

		const userResources = user.role.resources.find(
			({ route }) => route === currentUrlPath,
		);

		if (userResources) {
			const operation = httpMethodsMapper[method];
			const hasPermission = userResources.permissions[operation];

			if (hasPermission) {
				return next();
			}
		}
	}

	return res.status(403).json({
		status: 'error',
		msg: 'Forbidden: You don’t have permission to access this page.',
	});
};

module.exports = isUserAuthorized;

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
	res.render('api/upload', {
		title: 'File Upload',
	});
};

exports.postFileUpload = (req, res) => {
	console.log('req', req);
	return res.status(200).json('Update user picture');
};

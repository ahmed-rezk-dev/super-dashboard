exports.index = (req, res) => {
	return res.status(200).json('index');
};
exports.find = (req, res) => {
	return res.status(200).json('find');
};
exports.store = (req, res) => {
	return res.status(200).json('store');
};
exports.update = (req, res) => {
	return res.status(200).json('update');
};
exports.delete = (req, res) => {
	return res.status(200).json('delete');
};

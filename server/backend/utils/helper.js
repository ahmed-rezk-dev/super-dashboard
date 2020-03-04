exports.split = thing => {
	if (typeof thing === 'string') {
		return thing.split('/');
	}
	if (thing.fast_slash) {
		return '';
	}
	const match = thing
		.toString()
		.replace('\\/?', '')
		.replace('(?=\\/|$)', '$')
		.match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
	return match
		? match[1].replace(/\\(.)/g, '$1').split('/')
		: thing
				.toString()
				.replace('\\/(?:([^\\/]+?))\\/?$/i', '')
				.replace('^\\/', '')
				.split('/');
};

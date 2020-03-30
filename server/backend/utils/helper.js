const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
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

function decodeBase64Image(dataString) {
	const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
	const response = {};

	if (matches == null) {
		const dataStringFilter = `data:image/jpeg;base64,${dataString}`;
		const matches2 = dataStringFilter.match(
			/^data:([A-Za-z-+\/]+);base64,(.+)$/
		);
		response.type = matches2[1];
		response.data = new Buffer(matches2[2], 'base64');
	} else {
		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
	}

	return response;
}
exports.base64Image = (image, id, imageName) => {
	try {
		// Decoding base-64 image
		// Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file

		// Regular expression for image type:
		// This regular image extracts the "jpeg" from "image/jpeg"
		const imageTypeRegularExpression = /\/(.*?)$/;

		// Generate random string
		const seed = crypto.randomBytes(20);
		const uniqueSHA1String = crypto
			.createHash('sha1')
			.update(seed)
			.digest('hex');

		const base64Data =
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAAD/4Q3zaHR0cDovL25zLmFkb2JlLmN...';

		const imageBuffer = decodeBase64Image(image);
		const uploadPath = path.join(__dirname, 'uploads');

		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}

		if (imageName == '') {
			var uniqueRandomImageName = `image-${uniqueSHA1String}`;
		} else {
			var uniqueRandomImageName = imageName;
		}

		// This variable is actually an array which has 5 values,
		// The [1] value is the real image extension
		const imageTypeDetected = imageBuffer.type.match(
			imageTypeRegularExpression
		);

		const userUploadedImagePath = `${uploadPath}/${uniqueRandomImageName}.${imageTypeDetected[1]}`;

		// Save decoded binary image to disk
		try {
			fs.writeFile(userUploadedImagePath, imageBuffer.data, function() {});
			return {
				path: `/uploads/${id}/${uniqueRandomImageName}.${imageTypeDetected[1]}`,
				msg: `DEBUG - feed:message: Saved to disk image attached by user: ${userUploadedImagePath}`,
			};
			// return {path: userUploadedImagePath, msg: 'DEBUG - feed:message: Saved to disk image attached by user: '+userUploadedImagePath}
		} catch (error) {
			console.log('ERROR:', error);
		}
	} catch (error) {
		console.log('ERROR:', error);
	}
};

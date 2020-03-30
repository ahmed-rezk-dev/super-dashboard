/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'uploads'),
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${req.params.id}`);
	},
});

const upload = multer({ storage });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', err => {
	console.error(err);
	console.log(
		'%s MongoDB connection error. Please make sure MongoDB is running.',
		chalk.red('✗')
	);
	process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
		store: new MongoStore({
			url: process.env.MONGODB_URI,
			autoReconnect: true,
		}),
	})
);

// #region Function casing => Error: CSRF token missing
// app.use((req, res, next) => {
// 	if (req.path === '/api/upload') {
// 		// Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
// 		next();
// 	} else {
// 		lusca.csrf()(req, res, next);
// 	}
// });
// #endregion
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

/**
 * Upload files api
 */
// #region
const apiController = require('./controllers/api');
app.get('/api/upload', lusca({ csrf: true }), apiController.getFileUpload);
// app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
app.post(
	'/api/upload/:id',
	upload.single('avatar'),
	apiController.postFileUpload
);
// #endregion

/**
 * Browser routes
 */
app.get('/whoami', (req, res) => {
	res.send('You are a winner');
});
/**
 * Api Routes.
 */
const webRoutes = require('./routes/web');
app.use('/api', webRoutes);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
	// only use in development
	app.use(errorHandler());
} else {
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(500).send('Server Error');
	});
}

module.exports = app;

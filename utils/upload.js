const multer = require('multer');
const path = require('path');

// set storage engine
const fileStorage = multer.diskStorage({
	destination: './public/uploads/',
	filename: (req, file, cb) => {
		// (error, string: how our uploads will be named)
		// filnames will look like this: upload-{timestamp}-{original name}.{original extension}
		cb(
			null,
			`${file.fieldname}-${Date.now()}-${path.parse(file.originalname).name}${path.extname(file.originalname)}`,
		);
	},
});

// check file type
const checkFileType = (file, cb) => {
	// allowed extensions
	const filetypes = /jpeg|jpg|png|gif|mp4|webm|avi|mov|wmv|flv|mkv|mts/;

	// check extension
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase(),
	);

	// check mime type
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Error: Images only.');
	}
};

// init upload variable
const upload = multer({
	storage: fileStorage,
	limits: {
		// file limits here e.g fileSize
	},
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

// init upload variable simple version
// const upload = multer({ dest: '../public/uploads' });

module.exports = upload;

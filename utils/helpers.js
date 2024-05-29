const dayjs = require('dayjs');

function formatDate(date) {
	return dayjs(date).format('DD-MMM-YYYY');
}

module.exports = { formatDate };

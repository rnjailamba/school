var keystone = require('keystone');
var Notification = keystone.list('Notification');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'notification';
	locals.filters = {
		notification: req.params.notification,
	};
	console.log(locals);

	// Load the current notification
	view.on('init', function (next) {

		var q = Notification.model.findOne({
			key: locals.filters.notification,
		}).populate('Notification categories');

		q.exec(function (err, result) {
			console.log(result);
			locals.notification = result;
			next(err);
		});

	});

	view.render('notification');

}

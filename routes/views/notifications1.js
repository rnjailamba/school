var keystone = require('keystone');
var async = require('async');
var Notification = keystone.list('Notification');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'notifications1';
	locals.filters = {
		category: req.params.category,
	};
	locals.posts = [];
	locals.categories = [];

	// Load the posts
	view.on('init', function (next) {

		var q = Notification.paginate({
				page: req.query.page || 1,
 				perPage: 10,
 				maxPages: 10,
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author');

		q.exec(function (err, results) {
			locals.notifications = results;
			next(err);
		});

	});

	// Render the view
	view.render('notifications1');

}

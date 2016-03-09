var keystone = require('keystone');
var async = require('async');
var Notification = keystone.list('Notification');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'homePage';
	locals.filters = {
		category: req.params.category,
	};
	locals.posts = [];
	locals.categories = [];

	// Load the posts
	view.on('init', function (next) {

		var q = Notification.model.find();

		q.exec(function (err, results) {
			locals.notifications = results;
			console.log(results);
			next(err);
		});

	});

	// Render the view
	view.render('home');
}

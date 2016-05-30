var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post');
var PostCategory = keystone.list('PostCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog1';
	locals.filters = {
		category: req.params.category,
	};
	locals.posts = [];
	locals.categories = [];

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			PostCategory.model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = Post.paginate({
				page: req.query.page || 1,
 				perPage: 5,
 				maxPages: 1000,
			})
			.where('state', 'published')
			.sort('publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('blog1');

}

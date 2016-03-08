var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'blog1';
	view.render('blog1');
}

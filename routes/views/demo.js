var keystone = require('keystone');
// var Gallery = keystone.list('Demo');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	view.render('demo');

}

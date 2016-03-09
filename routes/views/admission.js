var keystone = require('keystone');
var Admission = keystone.list('Admission');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'admission';
	locals.filters = {
		admission: req.params.admission,
	};
	console.log(locals);

	// Load the current admission
	view.on('init', function (next) {

		var q = Admission.model.findOne({
			key: locals.filters.admission,
		}).populate('Admission');

		q.exec(function (err, result) {
			console.log(result);
			locals.admission = result;
			next(err);
		});

	});

	view.render('admission');

}

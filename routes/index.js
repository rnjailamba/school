const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
		{ label: 'Notifications', key: 'notifications', href: '/notifications' },
		{ label: 'Admissions', key: 'admissions', href: '/admissions' },
		{ label: 'Homepage', key: 'homepage', href: '/home' },
	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);	
	app.get('/gallery', routes.views.gallery);
	app.get('/notification/:notification', routes.views.notification);
	app.get('/notifications/', routes.views.notifications);
	app.get('/home/', routes.views.home);
	app.get('/about/', routes.views.about);
	app.get('/blog1/', routes.views.blog1);
	app.get('/contact1/', routes.views.contact1);
	app.get('/gallery1/', routes.views.gallery1);
	app.get('/post1/:post', routes.views.post1);
	app.get('/notifications1/', routes.views.notifications1);
	app.get('/notification1/:notification', routes.views.notification1);
	app.get('/admission/:admission', routes.views.admission);
	app.get('/admissions/', routes.views.admissions);	

	// Downloads
	app.get('/download/users', routes.download.users);

}

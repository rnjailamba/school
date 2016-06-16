const keystone = require('keystone');
var sitemap = require('keystone-express-sitemap');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact1', href: '/contact1' },
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
	app.get('/', routes.views.home);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);
	app.get('/gallery', routes.views.gallery);
	app.get('/notification/:notification', routes.views.notification);
	app.get('/notifications/', routes.views.notifications);
	app.get('/home/', routes.views.index);
	app.get('/about/', routes.views.about);
	app.get('/principalsDesk/', routes.views.principalsDesk);
	app.get('/infrastructure/', routes.views.infrastructure);
	app.get('/academic/', routes.views.academic);
	app.get('/blog1/', routes.views.blog1);
	app.all('/contact1/', routes.views.contact1);
	app.get('/gallery1/', routes.views.gallery1);
	app.all('/blog1/post1/:post', routes.views.post1);
	app.get('/notifications1/', routes.views.notifications1);
	app.get('/notification1/:notification', routes.views.notification1);
	app.get('/admission/:admission', routes.views.admission);
	app.get('/admission1/:admission', routes.views.admission1);
	app.get('/admissions/', routes.views.admissions);
	app.get('/admissions1/', routes.views.admissions1);
	app.get('/sitemap.xml', function(req, res) {
		// sitemap.create(keystone, req, res, {
		// 	ignore: ['/secret/:id']
		// });
		var xml = '<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"> <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com --> <url> <loc>http://www.tpsnarainavihar.com/</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/about</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/contact1</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/academic</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/notifications1</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/admissions1</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/principalsDesk</loc> </url> <url> <loc>http://www.tpsnarainavihar.com/infrastructure</loc> </url> </urlset>';
		res.set('Content-Type', 'application/rss+xml');
		res.send(xml);
	});

	// Downloads
	app.get('/download/users', routes.download.users);

}

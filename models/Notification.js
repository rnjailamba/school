var keystone = require('keystone');
var Types = keystone.Field.Types;

var Notification = new keystone.List('Notification', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Notification.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	pdfName: { type: String, index: true,default: 'Download File' },
	pdfURL: { type: String},
	publishedDate: { type: Types.Date, index: true },
	content: { type: Types.Html, wysiwyg: true, height: 150  }
});

Notification.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});


Notification.track = true;
Notification.defaultColumns = 'name, publishedDate,content,state';
Notification.register();

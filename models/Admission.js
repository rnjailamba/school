var keystone = require('keystone');
var Types = keystone.Field.Types;

var Admission = new keystone.List('Admission', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Admission.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	pdfName: { type: String, index: true,default: 'Download pdf by clicking here' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});

Admission.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Admission.track = true;
Admission.defaultColumns = 'name, state , author , publishedDate ,pdfName, content';
Admission.register();

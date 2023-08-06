const {titleCase} = require('title-case');
const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g // This regex finds all wikilinks in a string
function caselessCompare(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}

module.exports = {
	permalink: '/{{ page.fileSlug | replace: " ", "-" }}/',
	lang: 'it',
	layout: 'wrapper',
	viewportFrame: true,
	image: 'https://x.scambi.org/scambi.webp',
	// Automatically generating titles, as explained in https://github.com/11ty/eleventy/discussions/2241#discussioncomment-2224265
	eleventyComputed: {
		title(data) {
			// return data.title || deslugify(data.page?.fileSlug);
			let hadTitle = false;
			const title = data.title || require('lodash').startCase(data.page?.fileSlug);
			if (data.title) {
				hadTitle = true;
			}
			// console.log(`${data.page.filePathStem} => ${title}${hadTitle ? " (had title)" : ""}`);
			return title;
		},
		/*date(data) {
			let hadDate = false;
			const date = data.date || '2020-03-20';
			if (data.date) {
				hadDate = true;
			}
			return date;
		},*/
		updated(data) {
			let hadUpdated = false;
			const updated = data.updated || data.date;
			if (data.updated) {
				hadUpdated = true;
			}
			return updated;
		},
		sitemap: {
			img: data => {
			return { url: data.image };
			},
		}
	}
};

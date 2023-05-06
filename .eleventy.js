// Markdown //
const markdownIt = require('markdown-it');
const md = markdownIt({
	html: true,
	typographer: true
})
.use(require('markdown-it-anchor'), {
	permalink: require('markdown-it-anchor').permalink.headerLink(),
})
.use(require('markdown-it-footnote'))
.use(require('markdown-it-mark'))
.use(require('markdown-it-task-lists'));

module.exports = function(eleventyConfig) {
	// General //
	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addDataExtension('csv', contents => require('csv-parse/sync').parse(contents, {columns: true, skip_empty_lines: true}));

	eleventyConfig.addGlobalData('permalink', () => {
		return (data) => slugify(`${data.page.fileSlug}`, {
			remove: /'/g,
			lower: true
		}).concat('/');
	});

	// Collections //
	eleventyConfig.addCollection('blog', function(collection) {
		return collection.getFilteredByGlob('scambi.org/blog/*').sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});
	// Multilingual sitemap collection. See https://github.com/quasibit/eleventy-plugin-sitemap#create-a-multilingual-sitemap
	eleventyConfig.addCollection('sitemap', function(collectionApi) {
		return collectionApi
			.getAll()
			.map((item, index, all) => {
				return {
					url: item.url,
					date: item.date,
					data: {
						...item.data,
						sitemap: {
							...item.data.sitemap,
							links:
								all
									.filter(other => other.data.ref === item.data.ref)
									.map(translation => {
										return {
											url: translation.url,
											lang: translation.data.lang,
										};
									}),
						},
					},
				}
			});
	});


	// Scss //
	eleventyConfig.addPassthroughCopy({'svg': '/'});
	eleventyConfig.addPassthroughCopy('fonts');

	// Plugins //
	eleventyConfig.addPlugin(require('eleventy-sass'), {
		compileOptions: {
			permalink: function(contents, inputPath) {
				return (data) => data.page.filePathStem.replace(/^\/styles\//, '/') + '.css';
			}
		},
		sass: {
			style: 'compressed'
		}
	});
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	eleventyConfig.addPlugin(require('@aloskutov/eleventy-plugin-external-links'), {
		url: 'https://scambi.org',
		rel: ['noreferrer', 'noopener', 'external'],
		overwrite: false,
		excludedDomains:[
			'https://wip.scambi.org'
		]
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-embed-everything'), {
		youtube: {
			options: {
				embedClass: 'embed',
				lite: {
					css: {
						enabled: false
					}
				}
			}
		},
		spotify: {
			options: {
				embedClass: 'embed',
				width: '100%'
			}
		},
		instagram: {
			options: {
				embedClass: 'embed'
			}
		}
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));
	eleventyConfig.addPlugin(require('@sardine/eleventy-plugin-tinysvg'), {
		baseUrl: 'assets/svg/'
	});
	eleventyConfig.addPlugin(require('eleventy-plugin-toc'), {
		ul: true,
	});
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
	eleventyConfig.addPlugin(require('@quasibit/eleventy-plugin-sitemap'), {
		sitemap: {
			hostname: 'https://scambi.org'
		},
		lastModifiedProperty: 'updated'
	});

	// Filters //
	eleventyConfig.addFilter('reverse', (collection) => {
		const arr = [...collection];
		return arr.reverse();
	});
	eleventyConfig.addFilter('markdownify', (str) => {
		return md.renderInline(str);
	});
	// RSS Filters //
	eleventyConfig.addFilter('dateToRfc3339', require('@11ty/eleventy-plugin-rss').dateToRfc3339);
	eleventyConfig.addFilter('getNewestCollectionItemDate', require('@11ty/eleventy-plugin-rss').getNewestCollectionItemDate);
	eleventyConfig.addFilter('absoluteUrl', require('@11ty/eleventy-plugin-rss').absoluteUrl);
	eleventyConfig.addFilter('convertHtmlToAbsoluteUrls', require('@11ty/eleventy-plugin-rss').convertHtmlToAbsoluteUrls);

	 // Minify output //
	eleventyConfig.addTransform('miniHtml', function(content, outputPath) {
		if( this.outputPath && this.outputPath.endsWith('.html') ) {
			let minified = require('html-minifier').minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true
			});
			return minified;
		}
		return content;
	});

	return {
		dir: {
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
			output: 'www'
		}
	};
};

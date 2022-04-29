module.exports = {
	purge: [
    'src/**/*.vue',
    'src/**/*.jsx',
  ],
	content: ['index.html', 'src/**/*.vue'],
	darkMode: 'class',
	theme: {},
	experimental: { optimizeUniversalDefaults: true },
}
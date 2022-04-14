const defaultConfig = require('tailwindcss/defaultConfig')
// const formsPlugin = require('@tailwindcss/forms')
module.exports = {
	content: ['index.html', 'src/**/*.vue'],
	darkMode: 'class',
	theme: {},
	experimental: { optimizeUniversalDefaults: true },
	// plugins: [formsPlugin]
}
const defaultConfig = require('tailwindcss/defaultConfig')
// const formsPlugin = require('@tailwindcss/forms')

module.exports = {
	content: ['index.html', 'src/**/*.vue'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	// plugins: [formsPlugin]
}

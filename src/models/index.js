const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(item => item !== './index.js')

const models = {}
for (let i = 0; i < keys.length; i += 1) {
	let ctx = context(keys[i]).default
	models[ctx['name']] = ctx
}

export default models
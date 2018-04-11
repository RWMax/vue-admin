export default {
	name: 'global',
	state: {
		isCollapse: false
	},
	mutations: {
		changeCollapse (state, isCollapse) {
			state.isCollapse = typeof isCollapse === 'undefined' ? !state.isCollapse : isCollapse 
		}
	},
	getters: {

	},
	actions: {
		changeCollapse ({ commit }, isCollapse) {
			commit('changeCollapse', isCollapse)
		}
	}
}
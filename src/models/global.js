import {routers, otherRouter, appRouter} from '../router/router';

export default {
	name: 'global',
	state: {
		isCollapse: false,
		currentPath: [
			{
				title: '首页',
				path: '/',
				name: 'dashboard'
			}
		], // 面包屑数组
		routers: [
            otherRouter,
            ...appRouter
        ],
		menuList: [],
	},
	mutations: {
		changeCollapse (state, isCollapse) {
			state.isCollapse = typeof isCollapse === 'undefined' ? !state.isCollapse : isCollapse 
		},
		// 设置面包屑数组
		setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
		},
		// 更新菜单权限(如果存在的话)
		updateMenulist(state) {
            let menuList = [];
            let appRouterList = JSON.parse(JSON.stringify(appRouter));
            appRouterList.forEach((item, index) => {
                if (item.children.length === 1) {
					menuList.push(item);
				} else {
					let len = menuList.push(item);
					let childrenArr = [];
					for (const child of item.children) {
						childrenArr.push(child);
					}
					if(childrenArr.length === 0) {
						menuList.splice(len - 1, 1);
					} else {
						menuList[len - 1].children = childrenArr;
					}
				}
			});
            state.menuList = menuList;
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
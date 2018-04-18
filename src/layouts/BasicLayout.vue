/**
@description 首页基本布局文件
@author huangyang
@date 2018/03/14
*/
<template>
	<el-container class="thjk-aside" style="height:100%">
		<el-row 
			direction="vertical" 
			class="left-side"
		>
			<div class="logo" :class="{'collapse-sm':isCollapse}">
				<a href="#/">
					<img class="img" src="../assets/logo.png">
					<h1>Taroco UI</h1>
				</a>
			</div>
			<el-aside>
				<el-menu default-active="/dashboard" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
					<el-menu-item index="/dashboard">
						<i class="anticon ant-icon-home"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-submenu v-for="(item, index) in menuList" :key="item.path" :index="item.path">
						<template slot="title">
							<i class="anticon" :class="item.icon"></i>
							<span slot="title">服务治理</span>
						</template>
						<el-menu-item v-for="ch in item.children" :key="ch.path" :index="item.path + '/' + ch.path">{{ch.title}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
		</el-row>
		<el-container>
			<header-layout :isCollapse="isCollapse" :currentPath="currentPath"></header-layout>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>
				<p class="global-footer-copyright">Copyright <i class="anticon ant-icon-copyright"></i>2018 Taroco</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import HeaderLayout from './HeaderLayout'
import { mapState } from 'vuex'
export default {
	name: 'BasicLayout',
	// 计算属性
  	computed: {
  		...mapState({
			isCollapse: state => state.global.isCollapse,
			currentPath: state => state.global.currentPath
		}),
		menuList () {
			return this.$store.state.global.menuList;
		},
  	},
  	methods: {
		handleOpen(key, keyPath) {
			
		},
		handleClose(key, keyPath) {
			
		}
	},
	components: {
		HeaderLayout
	}
}
</script>

<style lang="scss" >
	@import '../styles/vars/element-variables.scss';
		
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 256px;
	}

	.#{$--prefixClass}-aside {

		.left-side {
			height:100%;
			background-color:#001529;
		}

		.collapse-sm {
			width: 64px !important;
		}

		.logo {
			width: 100%;
			height: 64px;
			line-height: 64px;
			padding-left: 20px;
			background-color: #002140;
			overflow: hidden;

			.img {
				display: inline-block;
				width: 32px;
				height: 32px;
				vertical-align: middle;
			}

			h1 {
				display: inline-block;
				margin-left: 12px;
				color: #fff;
				font-size: 20px;
				font-weight: 600;
				vertical-align: middle;
			}
		}


		.el-aside {

			width: auto !important;
			background-color: transparent;
			overflow-x: hidden;

			.el-menu {
				border-right: 1px solid $--menu-item-fill;
			}

			.el-menu-item.is-active {
				color: $--el-menu-color;
			}

			.el-submenu [class^="el-icon-"],
			.el-menu [class^="el-icon-"] {
				color: $--el-menu-color;
			}

			.el-submenu__title:hover, 
			.el-submenu__title:focus,
			.el-submenu [class^="el-icon-"]:focus,
			.el-submenu [class^="el-icon-"]:hover,
			.el-menu [class^="el-icon-"]:focus,
			.el-menu [class^="el-icon-"]:hover {
				background-color: transparent;
				color: $--el-menu-hover-color;

				i {
					color: $--el-menu-hover-color;
				}
			}

			.el-menu-item:hover, 
			.el-menu-item:focus {
				background-color: #1890ff;
				color: $--el-menu-hover-color;

				i {
					color: $--el-menu-hover-color;
				}
			}

			.el-menu-item-group,
			.el-menu--inline {
				background: #000c17;
				box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
			}
		}

		.global-footer-copyright {
			line-height: 60px;
			color: rgba(0,0,0,.45);
    	font-size: 14px;
    	text-align: center;
		}
	}
	
</style>
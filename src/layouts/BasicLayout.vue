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
					<img class="img" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
					<h1>Element UI</h1>
				</a>
			</div>
			<el-aside>
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				  <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-location"></i>
				      <span slot="title">dashboard</span>
				    </template>
				    <el-menu-item index="1-1">分析页</el-menu-item>
    				<el-menu-item index="1-2">监控页</el-menu-item>
    				<el-menu-item index="1-3">工作台</el-menu-item>
				    <el-submenu index="1-4">
				      <span slot="title">图标</span>
				      <el-menu-item index="1-4-1">折线图</el-menu-item>
				      <el-menu-item index="1-4-2">柱状图</el-menu-item>
				    </el-submenu>
				  </el-submenu>
				  <el-menu-item index="2">
				    <i class="el-icon-menu"></i>
				    <span slot="title">表单页</span>
				  </el-menu-item>
				  <el-menu-item index="3">
				    <i class="el-icon-document"></i>
				    <span slot="title">列表页</span>
				  </el-menu-item>
				  <el-menu-item index="4">
				    <i class="el-icon-setting"></i>
				    <span slot="title">详情页</span>
				  </el-menu-item>
				</el-menu>
			</el-aside>
		</el-row>
		<el-container>
			<header-layout :isCollapse="isCollapse"></header-layout>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>
				<p class="global-footer-copyright">Copyright <i class="anticon ant-icon-copyright"></i>2018 途欢健康科技有限公司</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import HeaderLayout from './HeaderLayout'
import { mapState } from 'vuex'
export default {

  name: 'BasicLayout',
  computed: {
  	...mapState({
  		isCollapse: state => state.global.isCollapse
  	})
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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
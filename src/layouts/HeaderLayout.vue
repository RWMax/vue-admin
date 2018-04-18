<template>
	<el-header 
    class="thjk-header" 
    style="height:64px;line-height:64px;"
  >
		<i 
    class="anticon menu-fold"
    :class="{
      'ant-icon-menu-fold': !isCollapse, 
      'ant-icon-menu-unfold': isCollapse
    }" 
    @click.stop="changeCollapse"
    />
    <el-breadcrumb class="breadcrumb" separator="/">
			<el-breadcrumb-item v-for="item in currentPath" :to="{ path: item.path}" :key="item.path">{{item.title}}</el-breadcrumb-item>
		</el-breadcrumb>

    <div class="right">
      <ul style="font-size: 0">
        <li class="message">
          <el-badge value="10" class="item">
            <i class="anticon ant-icon-bell"></i>
          </el-badge>
        </li>
        <li class="user">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img class="user-image" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png">
              <span class="username">Jack Li</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>
                  <i class="anticon ant-icon-user"></i>
                  <span>个人中心</span>
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span>
                  <i class="anticon ant-icon-setting"></i>
                  <span>设置</span>
                </span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span>
                  <i class="anticon ant-icon-poweroff"></i>
                  <span>退出登录</span>
                </span>
              </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </li>
      </ul>
    </div>
	</el-header>
</template>

<script>

export default {

  name: 'HeaderLayout',
  props: {
    isCollapse: Boolean,
    currentPath: Array
  },
  methods: {
  	changeCollapse () {
  		this.$store.dispatch('changeCollapse')
  	}
  }
}
</script>

<style lang="scss" scoped>
	@import '../styles/vars/element-variables.scss';

	.#{$--prefixClass}-header {
		position: relative;
		width: 100%;
    padding-left: 0;
    padding-right: 12px;
		box-shadow: 0 1px 4px rgba(0,21,41,.08);

    @media only screen and (max-width: 768px) {
      .menu-fold {
        padding: 0 12px;
      }
    }

    .breadcrumb {
      line-height: 64px;
      display: inline-block;
    }

    .menu-fold {
      float: left;
      padding: 0 24px;
      font-size: 20px;
      line-height: 64px;
      cursor: pointer;
      -webkit-transition: all .3s,padding 0s;
      transition: all .3s,padding 0s;

      &:hover {
        background: #e6f7ff;
      }
    }

    .right {
      float: right;

      .message {

        .item {
          line-height: 1;
        }

        .item i {
          font-size: 16px;
          padding: 4px; 
        }
      }

      .user, .message, .search {
        display: inline-block;
        padding: 0 14px;
        &:focus,
        &:hover {
          background: #e6f7ff;
        }
      }

      .el-dropdown {
        font-size: 0;
      }

      .el-dropdown-link {

        display: inline-block;
        height: 64px;
        line-height: 64px;
        font-size: 0;

        .user-image {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 5px;
          vertical-align: middle;
        }

        .username {
          display: inline-block;
          font-size: 14px;
          color: rgba(0,0,0,.65);
          vertical-align: middle;
        }
      }
    }
	}
</style>
<template>
	<el-row class="thjk-worlplace">
		<el-breadcrumb class="breadcrumb" separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="card-layout">
			<span slot="header">用户管理</span>
			<el-row :gutter="40">
				<el-col :span="8">
					<el-input
    				placeholder="请输入用户名"
    			>
    				<i slot="prefix" class="el-input__icon anticon ant-icon-user"></i>
  				</el-input>
				</el-col>
				<el-col :span="7" :offset="1">
					<el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
  				</el-select>
				</el-col>
				<el-col :span="7" :offset="1">
					<el-date-picker
      			type="datetime"
      			v-model="datetime"
      			placeholder="选择日期时间">
    			</el-date-picker>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="card-layout">
			<span slot="header">用户列表</span>
			<user-table></user-table>
		</el-card>
		
	</el-row>
</template>

<script>
import UserTable from '@/components/table/UserTable'
export default {

  name: 'WorkPlace',

  data () {
    return {
    	options: [{
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }
      ],
      value: '',
      datetime: ''
    }
  },
  components: {
  	UserTable
  }
}
</script>

<style lang="scss" scoped>
	
	.thjk-worlplace {

		.breadcrumb {
			margin-top: 20px;
		}

		.card-layout {
			margin: 40px 0;
		}

		.el-select, .el-date-editor.el-input {
			width: 100%;
		}
	}
	
</style>
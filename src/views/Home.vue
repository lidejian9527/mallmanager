<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <img src="../assets/images/logo.png" alt="无法显示图片">
                </el-col>
                <el-col :span="19" class="middle">
                    <div class="grid-content bg-purple-light">
                        <h2>电商后台管理系统</h2>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">
                        <a href="#"
                            class="loginout" @click.prevent='logout'>退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo menu" :unique-opened="true" :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/user"><i class="el-icon-menu"></i>用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
                        <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
                        <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
                        <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                     <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  beforeCreate() {
    if (!sessionStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      this.$message.success("退出成功");
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.header .middle {
  line-height: 60px;
  color: #fff;
  text-align: center;
}
.header .loginout {
  line-height: 60px;
  text-decoration: none;
}
.aside .menu {
    height: 100%;
}
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>

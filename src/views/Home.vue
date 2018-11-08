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
                    <el-submenu :index="index+''" v-for="(item1, index) in menuList" :key="index">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item-group v-for="(item2, index) in item1.children" :key="index">
                            <el-menu-item :index="'/'+item2.path"><i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
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
    data () {
        return {
            menuList: []
        }
    },
    async beforeCreate() {
        if (!sessionStorage.getItem("token")) {
        this.$router.push("/login");
        }
        const res = await this.$http.get('menus')
        this.menuList = res.data.data
    },
    mounted () {
        
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
.grid-content h2 {
    text-align: center;
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

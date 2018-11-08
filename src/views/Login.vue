<template>
    <div class="login-wrap">
        <el-form class="login-form" label-width="80px" :model='fromData' :label-position="labelPosition">
        <el-form-item label="用户名">
            <el-input v-model="fromData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="fromData.password"></el-input>
        </el-form-item>
        <el-button class="login-button" type="primary" @click.prevent="login">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      fromData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
      async login () {
          const res = await this.$http.post('login', this.fromData);
          if (res.data.meta.status == 200) {
              this.$message.success(res.data.meta.msg)
              sessionStorage.setItem('token', res.data.data.token)
              this.$router.push('/')
          }else {
              this.$message.error(res.data.meta.msg)
          }
      }
  }
};
</script>

<style scoped>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>

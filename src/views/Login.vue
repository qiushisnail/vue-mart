<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="handleLogin" @validate="handleValidate"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        // 数据模型
        username: "",
        password: ""
      },
      schema: {
        // 表单结构模型
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            trigger: "blur", //校验的触发
            messages: {
              required: "用户名为必填项"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "用户名",
            props: {
              // 标签的具体属性
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false } // 密码是看不到
            },
            rules: {
              required: true
            },
            trigger: "blur", //校验的触发
            messages: {
              required: "用密码为必填项"
            }
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    async handleLogin(e) {
      e.preventDefault(); // 避免表单的默认行为
      const res = await this.$http.post("/api/login", { // request.body
         
          username: this.model.username,
          password: this.model.password
        
      });
      const { code, token, message } = res.data;
      if (code == 0) {
        // 登录成功
        localStorage.setItem("token", token); // 缓存至本地
        this.$store.commit("setToken", token); // 存入 store
        // 回跳，重定向
        
        const { redirect } = this.$route.query ;
        this.$router.push(redirect || '/');
      } else {
        // 登录失败
        const toast = this.$createToast({
          time: 2000,
          txt: message || "登录失败",
          type: "error"
        });
        toast.show();
      }
    },
    handleValidate(ret) {
      console.log("校验: " + ret);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
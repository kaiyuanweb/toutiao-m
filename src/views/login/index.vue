<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon @click="$router.back()" slot="left" name="cross" />
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field maxlength="11" type="number" :rules="rules.mobile" v-model="user.mobile" name="mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field maxlength="6" type="number" :rules="rules.code" v-model="user.code" name="code" placeholder="请输入验证码">
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down @finish="isCountDown = false" v-if="isCountDown" :time="1000 * 60" format="ss s" />
          <van-button v-else native-type="button" @click="onSendSMS" class="send-sms-but" round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendSMS } from '@/api/user'
export default {
  name: 'LoginIdex',
  data () {
    return {
      user: {
        mobile: '18538938936',
        // mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isCountDown: false
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        console.log('登录成功', data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或密码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
        console.log('登录失败', err)
      }
    },
    async onSendSMS () {
      // 验证手机号   验证是一个pormise  一个异步请求 async  await
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      // 显示倒计时
      this.isCountDown = true
      // 发送请求
      try {
        await sendSMS(this.user.mobile)
      } catch (err) {
        this.isCountDown = false
        if (err.response.status === 429) {
          this.$toast.fail('发送频繁，请稍后重试')
        } else {
          console.log(err)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .iconshouji,
  .iconyanzhengma {
    font-size: 37px;
  }
  .send-sms-but {
    background-color: #ededed;
    width: 162px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
  }
  .login-btn-wap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>

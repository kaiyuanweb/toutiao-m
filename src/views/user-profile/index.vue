<template>
  <div class="user-profile">
    <!--导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 @click-left="$router.back()"
                 title="个人信息" />
    <!-- 个人信息 -->
    <van-cell title="头像"
              is-link>
      <van-image class="avatar"
                 round
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              @click="isUpdateShow= true"
              :value="user.name"
              is-link />
    <van-cell title="性别"
              :value="user.gender === 0?'男':'女'"
              is-link />
    <van-cell title="生日"
              :value="user.birthday"
              is-link />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateShow"
               style="height:100%;"
               position="bottom">
      hello
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  props: {

  },
  data () {
    return {
      user: {

      },
      isUpdateShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>

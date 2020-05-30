<template>
  <!-- <div class="follow-user"> -->
  <van-button class="follow-btn"
              v-if="isFollowed"
              round
              :loading="loading"
              @click="onFollow"
              size="small">已关注</van-button>
  <van-button class="follow-btn"
              v-else
              type="info"
              color="#3296fa"
              round
              :loading="loading"
              size="small"
              @click="onFollow"
              icon="plus">关注</van-button>
  <!-- </div> -->
</template>
<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'followUser',
  model: {
    prop: 'isFollowed', // 默认  value
    event: 'update-isFollowed' // 默认  input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败请重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped></style>

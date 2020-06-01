<template>
  <van-button :icon="value === 1? 'good-job':'good-job-o'"
              @click="onClick"
              :loading="loading"
              :class="{liked:value === 1}" />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
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
    async  onClick () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
        // 跟新视图
        this.$emit('input', status)
      } catch (err) {
        this.$toast('加载失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>

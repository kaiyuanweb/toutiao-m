<template>
  <van-button :icon="value ? 'star':'star-o'"
              @click="onClick"
              :loading="loading"
              :class="{collected:value}" />
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        // 跟新视图
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('加载失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>

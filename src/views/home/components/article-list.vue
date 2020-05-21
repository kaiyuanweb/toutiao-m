<template>
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        console.log(data)
      } catch (err) {
        console.log(err)
      }

      // 加载状态结束
      // this.loading = false

      // 数据全部加载完成
      if (this.list.length >= 40) {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped></style>

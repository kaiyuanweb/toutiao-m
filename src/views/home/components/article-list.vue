<template>
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
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
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 判断是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>

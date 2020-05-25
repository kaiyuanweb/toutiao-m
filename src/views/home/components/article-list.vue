<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshingSuccessText">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <article-item v-for="(item, index) in list" :key="index" :article="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
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
      timestamp: null,
      error: false,
      refreshing: false,
      refreshingSuccessText: '刷新成功'
    }
  },
  methods: {
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshing = false
        this.refreshingSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshingSuccessText = '刷新失败'
        this.refreshing = false
      }
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = false
      this.onLoad()
    },
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
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
// article-list固定高度  每次滚动是article-list滚动   点击nav-bar切换 都能记住对应ArticleList的位置
// nva-bar  有多少个菜单项  就有多少个ArticleList组件
.article-list {
  height: 79.4vh;
  overflow-y: auto;
}
</style>

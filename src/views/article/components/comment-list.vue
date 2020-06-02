<template>
  <van-list v-model="loading"
            :finished="finished"
            :error='error'
            error-text="加载失败，请重试"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad">
    <comment-item v-for="(item,index) in list"
                  :comment="item"
                  @reply-click="$emit('reply-click',$event)"
                  :key="index" />
  </van-list>
</template>
<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'commenList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    // 初始onload  不会loading   要手动初始loding
    this.loading = true
    this.onLoad()
  },
  methods: {
    async  onLoad () {
      try {
        // 获取文章评论和评论回复的回复是同一个接口
        const { data } = await getComments({
          type: this.type, // a  文章  c评论
          source: this.source.toString(), // 文章id 或评论id
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        // 文章縂數量
        this.$emit('onload-success', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>

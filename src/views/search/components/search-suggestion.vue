<template>
  <div class="search-suggestion">
    <van-cell icon="search"
              v-for="(text,index) in suggestions"
              :key="index"
              @click="$emit('search',text)">
      <span slot="title"
            v-html="highlight(text)"></span>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // handler 函数是固定的
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      // debounce 函数  参数一是一个函数   参数二是一个延迟时间  返回防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 回调函数会在监听开始之后立即调用
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
        console.log(err)
      }
    },
    highlight (text) {
      const highlight = `<span class="active">${this.searchText}</span>`
      // 正则 //中间的内容都会当初匹配字符
      // 如果需要动态的创建正则  这手动 new RegExp  参数一 匹配字符串 创建正则  参数二 匹配模式写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlight)
    }
  }
}
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>

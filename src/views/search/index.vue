<template>
  <div class="search-container">
    <!-- 顶部搜索栏  -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form class="search-form"
          action="/">
      <van-search v-model="searchText"
                  show-action
                  background="#3296fa"
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShou = false" />
    </form>
    <!-- 历史结果 -->
    <Search-result v-if="isResultShou"
                   :searchText="searchText"></Search-result>
    <!-- 联想建议 -->
    <Search-suggestion v-else-if="searchText"
                       @search="onSearch"
                       :searchText="searchText"></Search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history :searchHistories="searchHistories"
                    @search="onSearch"
                    @clear-search-histories="searchHistories = []"
                    v-else></search-history>

  </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShou: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []// 搜索的历史记录数据

    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录  1不要重复  2最新的排在前边
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShou = true
    },
    onCancel () {
      this.$toast('取消')
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>

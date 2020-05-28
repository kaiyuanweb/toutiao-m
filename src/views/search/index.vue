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
    <search-history v-else></search-history>

  </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
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
      isResultShou: false
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      console.log(val)
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

<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories',[])">全部删除</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon v-else
                @click="isDeleteShow = true"
                name="delete"></van-icon>
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories"
              :key="index"
              @click="onSearchItemClick(item,index)"
              :title="item">
      <van-icon v-show="isDeleteShow"
                name="close"></van-icon>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'searchHistory',
  // props 数据
  // 如果是普通数据（数字，字符串，布尔值）  在子组件不能修改
  // 如果是引用型数据  （数组  对象）
  // 可以修改[].push(xxx)
  // 不能重新赋值  xxx=[]
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除
        this.searchHistories.splice(index, 1)
      } else {
        // 搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>

<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count > 0 ?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon slot="left"
                @click="$emit('close')"
                name="cross"></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment"></comment-item>
      <!-- /当前评论项 -->
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :source="comment.com_id"
                    :list="commentList"
                    type="c"></comment-list>
      <!-- /评论的回复列表  -->
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-button"
                  size="small"
                  round>
        <comment-post @post-success="onPostSuccess"
                      :target="comment.com_id"></comment-post>
      </van-button>
    </div>
    <!-- /发布评论-->
  </div>
</template>
<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      // 更新回复数量
      this.comment.reply_count++
      // 关闭弹窗
      this.isPostShow = false
      // 回复内容置顶
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1 solid #d8d8d8;
  .post-button {
    width: 60%;
  }
}
</style>

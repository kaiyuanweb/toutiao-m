<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 title="黑马头条"
                 @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading"
           class="loading-wrap">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title"
           class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src="article.aut_photo" />
          <div slot="title"
               class="user-name">{{ article.aut_name }}</div>
          <div slot="label"
               class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <!-- 模板中的 $event 是事假参数
               当我们传给子组件的数据 既要用又要修改  可以简写方式  v-model -->
          <!-- v-model 默认  传 value='article.is_followed'  子组件接受的是 value
                                     @input='article.is_followed = $event'  子组件发送的是input -->
          <!-- 如果要修改传递的 v-model的规则名称 可以通过使用子组件的model属性来配置 -->
          <!--  @update-is_followed="article.is_followed = $event"
                      :is-followed='article.is_followed' -->
          <!-- 一个组件上只能使用一次 v-model  如果有多少个数据要实现类似于 v-model  可以使用 .sync修饰符 -->
          <follow-user class="follow-btn"
                       v-model="article.is_followed"
                       :user-id="article.aut_id"></follow-user>
          <!-- <van-button class="follow-btn"
                      v-if="article.is_followed"
                      round
                      :loading="followLoading"
                      @click="onFollow"
                      size="small">已关注</van-button>
          <van-button class="follow-btn"
                      v-else
                      type="info"
                      color="#3296fa"
                      round
                      :loading="followLoading"
                      size="small"
                      @click="onFollow"
                      icon="plus">关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body"
             v-html="article.content"
             ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <commen-list :source='article.art_id'
                     :list="commenList"
                     @onload-success='totalCommentCount = $event.total_count'></commen-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      @click="isPostShow = true"
                      size="small">写评论</van-button>
          <van-icon name="comment-o"
                    :info="totalCommentCount"
                    color="#777" />
          <collect-article v-model="article.is_collected"
                           :article-id="article.art_id"
                           class="btn-item">
          </collect-article>
          <like-article class="btn-item"
                        :article-id="article.art_id"
                        v-model="article.attitude">
          </like-article>
          <!-- <van-icon color="#777"
                    name="good-job-o" /> -->
          <van-icon name="share"
                    color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow"
                   position="bottom">
          <comment-post :target="article.art_id"
                        @post-success="onPostSuccess"></comment-post>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404"
           class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else
           class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import { ImagePreview } from 'vant'
import CollectArticle from '@/components/collect-article'
import FollowUser from '@/components/follow-user'
import LikeArticle from '@/components/like-article'
import CommenList from './components/comment-list'
import CommentPost from './components/comment-post'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommenList,
    CommentPost
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false,
      commenList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    onPostSuccess (data) {
      this.isPostShow = false
      this.commenList.unshift(data.new_obj)
    },
    async onFollow () {
      this.followLoading = true
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
          // this.article.is_followed = false
        } else {
          await addFollow(this.article.aut_id)
          // this.article.is_followed = true
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败请重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    },
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsankljdnskaljndlkjsa')
        // }
        this.article = data.data
        // 数据驱动视图这件事儿不是立即的
        // 初始化图片点击预览
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 无论成功还是失败，都需要关闭 loading
      this.loading = false
    },

    previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')

      // 获取所有 img 地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

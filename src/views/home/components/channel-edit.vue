<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button @click="isEdit = !isEdit" class="edit-btn" type="danger" plain round size="mini">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item @click="onMyChannelClick(channel, index)" class="grid-item" v-for="(channel, index) in myChannels" :key="index">
        <van-icon v-show="isEdit && !fiexChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <span :class="{ active: index === active }" class="text" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item @click="onAddChannel(channel)" icon="plus" class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    // recommendChannels () {
    //   return this.allChannels.filter(channel => {
    //     return !this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //   })
    // }
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0]
    }
  },
  created () {
    this.load()
  },
  methods: {
    async load () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log('this.allChannels', this.myChannels)
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      this.myChannels.push(channel)
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fiexChannels.includes(channel.id)) {
          return false
        }
        // 删除操作
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
      } else {
        // 切换操作
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0px;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0px;
        }
      }
    }
  }
}
</style>

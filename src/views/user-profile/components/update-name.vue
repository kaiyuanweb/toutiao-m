<template>
  <div class="update-name">
    <van-nav-bar title="设置昵称"
                 left-text="取消"
                 right-text="完成"
                 @click-right="onConfirm"
                 @click-left="$emit('close')" />
    <div class="field-wrap">
      <van-field v-model.trim="localName"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>

  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
        }
        const { data } = await updateUserProfile({ name: localName })
        console.log(data)
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.update-name {
  .field-wrap {
    padding: 20px;
  }
}
</style>

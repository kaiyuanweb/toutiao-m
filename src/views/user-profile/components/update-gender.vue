<template>
  <div class="update-gender">
    <van-picker title="标题"
                show-toolbar
                :default-index="value"
                :columns="columns"
                @confirm="onConfirm"
                @cancel="$emit('close')" />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
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
        this.$$emit('close')
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

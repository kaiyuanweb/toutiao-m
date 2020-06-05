<template>
  <div class="update-gender">
    <van-picker title="标题"
                show-toolbar
                :default-index="value"
                :columns="columns"
                @confirm="onConfirm"
                @change="onPickerChange"
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
      columns: ['男', '女'],
      localGender: 0
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
        const localGender = this.localGender
        await updateUserProfile({ gender: localGender })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
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

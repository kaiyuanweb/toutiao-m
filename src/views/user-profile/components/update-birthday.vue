<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         @cancel="$emit('close')"
                         @confirm="onConfirm"
                         :min-date="minDate"
                         :max-date="maxDate" />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({ birthday: currentDate })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
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

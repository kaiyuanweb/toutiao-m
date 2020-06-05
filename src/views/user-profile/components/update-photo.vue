<template>
  <div class="update-photo">
    <img :src="img"
         ref="img"
         class="img">
    <div class="toolbar">
      <div class="cancel"
           @click="$emit('close')">取消</div>
      <div class="fonfirm"
           @click="onConfirm">完成</div>
    </div>
  </div>

</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true

    })
  },
  data () {
    return {
      cropper: null
    }
  },
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // console.log(this.cropper.getData())  // 给后台裁切参数
      // 裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // console.log(blob)
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserPhoto(formData)
          console.log(data)
          this.$emit('close')
          this.$emit('update-photo', data.data.photo)
          this.$toast.success('更新成功')
        } catch (err) {
          this.$toast.error('更新失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .fonfirm,
    .cancel {
      width: 90%;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
}
</style>

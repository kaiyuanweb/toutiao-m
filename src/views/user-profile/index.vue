<template>
  <div class="user-profile">
    <!--导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 @click-left="$router.back()"
                 title="个人信息" />
    <input hidden
           ref="file"
           @change="onFileChange"
           type="file" />
    <!-- 个人信息 -->
    <van-cell title="头像"
              is-link>
      <van-image class="avatar"
                 round
                 @click="$refs.file.click()"
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              @click="isUpdateShow= true"
              :value="user.name"
              is-link />
    <van-cell title="性别"
              :value="user.gender === 0?'男':'女'"
              @click="isUpdateGenderShow = true"
              is-link />
    <van-cell title="生日"
              @click="isUpdateBirthdayShow = true"
              :value="user.birthday"
              is-link />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateShow"
               style="height:100%;"
               position="bottom">
      <update-name v-model="user.name"
                   v-if="isUpdateShow"
                   @close="isUpdateShow=false"></update-name>
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow"
               position="bottom">
      <update-gender v-model="user.gender"
                     v-if="isUpdateGenderShow"
                     @close="isUpdateGenderShow=false"
                     @click="isUpdateGenderShow = false"></update-gender>
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow"
               position="bottom">
      <update-birthday v-model="user.birthday"
                       v-if="isUpdateBirthdayShow"
                       @close="isUpdateBirthdayShow=false"></update-birthday>
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow"
               style="height:100%"
               position="bottom">
      <update-photo @close="isUpdatePhotoShow=false"
                    @update-photo="user.photo = $event"
                    v-if="isUpdatePhotoShow"
                    :img="img"></update-photo>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {

  },
  data () {
    return {
      user: {},
      isUpdateShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象 获取 blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // file-input 选择同一个图片不会触发 change事件
      // 把它的value清空就可以了
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>

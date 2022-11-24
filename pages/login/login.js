
// 获取应用实例
const app = getApp()

const db = wx.cloud.database()
const User = db.collection('User')

Page({
  data: {
    motto: '欢迎来到想换',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    wx.getUserProfile({desc: '用于个人信息展示'})
      .then(res =>{
          let user = {
            avatar_url: res.userInfo.avatarUrl,
            nick_name: res.userInfo.nickName,
            gender: res.userInfo.gender,
            create_date: new Date()
          }

          // sotre user info to local
          wx.setStorageSync('currentUser',user)
          //add user to database
          User.add({data:user}).then(()=>{
              wx.reLaunch({
                url: '/pages/index/index'
              })
          })

      })
    }

})

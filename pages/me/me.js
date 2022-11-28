// pages/me/me.js
const db = wx.cloud.database()

Page({
  data: {
    userInfo: {}, // 用户信息

  },

  /**
   * 页面加载
   */
  onLoad() {
    // 获取用户信息
    let userInfo = wx.getStorageSync('currentUser')
    this.setData({ userInfo })

  },


  // 跳转到我的帖子
  toMyPost() {
    wx.navigateTo({
      url: '/pages/myPost/myPost'
    })
  },
  // 跳转到关于我们
  toAboutMe() {
    wx.navigateTo({
      url: '/pages/aboutMe/aboutMe'
    })
  },
  
  // 跳转到退出登录
  toSignOut() {
    wx.navigateTo({
      url: '/pages/signout/signout'
    })
  },


 
})
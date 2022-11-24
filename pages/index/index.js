// pages/index/index.js
const db = wx.cloud.database()
const user = db.collection('User')
const post = db.collection('Post')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      SgdToRmbList:[],
      RmbToSgdList:[],
      active: 0 // tab的状态


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

        this.getUserInfo()
        this.getPostList(1)
        this.getPostList(0)
        

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    onChange(event){
      this.setData({ active: event.detail.name })
    },


    getUserInfo() {
      user.get().then(res => {
        if(res.data.length > 1) {
          wx.setStorageSync('currentUser', res.data[0])
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
        console.log("users",res.data)
      })
    },
   
   async getPostList(type){
      let data = {type}
      let dataType = !type ? 'SgdToRmbList':'RmbToSgdList'
      let {SgdToRmbList,RmbToSgdList} = this.data
      let { result } = await wx.cloud.callFunction({
        name:'getPostList',
        data
      })
      
      console.log("This is postlist: ",result.data);

      let postList = result.data.length ? result.data : []

      if (type)
      {
        postList = RmbToSgdList.unshift(result.data)
      }
      else
      {
        postList = SgdToRmbList.unshift(result.data)
      }

      this.setData({[dataType]:postList})

      console.log("this is rmb list",RmbToSgdList)
      console.log("this is sgd list",SgdToRmbList)
    }
})
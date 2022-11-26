// pages/index/index.js

import { getdate } from '../../utils/date'

const db = wx.cloud.database()
const user = db.collection('User')
const post = db.collection('Post')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      test123:123123,
      SgdToRmbList:[],
      RmbToSgdList:[],
      active: 0 // tab的状态
      


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

        this.getUserInfo()


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
      this.getPostList(1)
      this.getPostList(0)

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

      this.getPostList(this.data.active)
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

    copyContact(e){

      let currentid = e.currentTarget.id
      let tabstatus = this.data.active

      if (tabstatus)
      {
        for(let i = 0; i<this.data.RmbToSgdList.length; i++)
        {
          if (this.data.RmbToSgdList[i]._id===currentid)
          {
              wx.setClipboardData({
              data: this.data.RmbToSgdList[i].wxnumber,
              success(res){
                wx.showToast({
                  title: '已复制wx号',
                })
              }
            })
          }
        }
      }
      else
      {
        for (let i = 0; i<this.data.SgdToRmbList.length; i++)
      {
        if (this.data.SgdToRmbList[i]._id===currentid)
          {
            wx.setClipboardData({
              data: this.data.SgdToRmbList[i].wxnumber,
              success(res){
                wx.showToast({
                  title: '已复制wx号',
                })
              }
            })
          }
      } 
    }

    
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

      result.data?.forEach(item => item.publish_date = getdate(item.publish_date))

      let postList = result.data.length ? result.data : []

     
      if (type)
      {
        //postList = RmbToSgdList.unshift(result.data)
        postList = result.data
      }
      else
      {
        //postList = SgdToRmbList.unshift(result.data)
        postList = result.data

      }

      this.setData({[dataType]:postList})

      ///console.log("this is ",dataType,"List: ",postList)

 
    }



})
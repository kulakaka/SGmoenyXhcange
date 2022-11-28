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
      // rmbPageIndex:1,
      // sgdPageIndex:1,
      // rmbReachBottom:false,
      // sgdReachBottom:false,
      // pageSize:7,
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
     * 生命周期函数--监听页面显示
     */
    onShow() {


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
  
      let dataType = !type ? 'SgdToRmbList':'RmbToSgdList'
      let {SgdToRmbList,RmbToSgdList} = this.data
      let data = {type}

      //data.pageIndex = !type ? rmbPageIndex:sgdPageIndex



      let { result } = await wx.cloud.callFunction({
        name:'getPostList',
        data
      })

      result.data?.forEach(item => item.publish_date = getdate(item.publish_date))

      let postList = result.data.length ? result.data : []

    //    // 如果没有数据了则将 reachBottom 设为 true
    // if(!type && !result.data.length) { 
    //   this.setData({ sgdReachBottom: true })
    // } else if(type && !result.data.length) {
    //   this.setData({ rmbReachBottom: true })
    // }
      if (type)
      {
        postList = result.data
      }
      else
      {
        postList = result.data

      }

      this.setData({[dataType]:postList})


 
    }

    // onReachBottom() {
    //   let { rmbReachBottom, sgdReachBottom, rmbPageIndex, sgdPageIndex, active } = this.data
  
    //   // 判断当前为最新/最热
    //   if(!active) {
    //     // 如果到底部则返回
    //     if(rmbReachBottom) return
    //     // 分页+1
    //     this.setData({ rmbPageIndex: ++rmbPageIndex })
    //     // 获取数据
    //     this.getPostList(active)
    //   } else {
    //     // 如果到底部则返回
    //     if(sgdReachBottom) return
    //     // 分页+1
    //     this.setData({ sgdPageIndex: ++sgdPageIndex })
    //     // 获取数据
    //     this.getPostList(active)
    //   }
    // }



})